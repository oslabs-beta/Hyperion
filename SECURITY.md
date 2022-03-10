# Hyperion Security Design Overview

**Disclaimer:** Although we take security very seriously and implement all of the steps described below to the best of our abilities in order to secure your data, there is still a non-zero possibility that our systems could be compromised now or at any point in the future. We do not provide any guarantees or compensation in the event that our systems were to be compromised or breached in any way.

**Please read this before using our app:** We encourage all users to use our app on a sandboxed database instance that does not contain any sensitive data, using temporary non-superuser credentials. Even though we take steps to protect any potentially pre-existing data, you should avoid providing credentials for a database that contains sensitive data. By using our app, you acknowledge that there is a non-zero risk that your database could be compromised at any point in the future.

# How We Keep Accounts and Account Passwords Safe

## Accountpassword hashing
We hash passwords using bcrypt with a work factor setting of 12. These settings follow [OWASP recommendations for storing passwords](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html).

## Sessions

Eash session is identified using a unique 128-bit UUID v4 identifier which is generated using a cryptographically secure UUID v4 generation algorithm.

## Database Credentials Safe

We encrypt all database credentials using AES-256-GCM. We derive the 256-bit keys from the users' passwords by using the PBKDF2 key-stengthening algorithm with an iteration setting of 310,000. These settings follow [OWASP recommendations](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html). Sensitive database credentials cannot be read from our database without the user account password.

# How We Keep Data Safe in Transit

All data we receive and transmit is set to force TLSv1.2+ and above in all situations.

## Data transferred between the client and our application server

All data transferred between the browser and our application server is encrypted over HTTPS configured with TLSv1.2+. Unencrypted HTTP connections are not allowed.

## Data transferred between our application server and our database server 

Data transferred between our application server and our database server is encrypted using TLSv1.2+ with a selected set of cipher suites that provide forward secrecy. 

## Data transferred between our systems and third-party database instances

Data transmitted between our servers and your provided database server are always encrypted using TLSv1.2+. We set SSL mode to 'require' by default, and verify that TLSv1.2+ is enabled each time a database connection is established. This provides dependable protection against eavesdropping. However, we currently do not support the use of certificates and SSL modes 'verify-ca' and 'verify-full', so using our service may not provide complete MITM protection.

All statements we execute on third-party PostgreSQL servers are wrapped in transactions that are set to rollback changes. This helps reduce the risk of unauthorized data insertions, updates, and deletions.

# How We Keep our Database Server Safe

Our database server is only accessible to the application server. Any attempts to connect using any other IP address will be blocked by our firewall configuration.

We take steps to scrub and sanitize all input data to reduce the risk of SQL injections. We cannot, however, protect against vulnerabilities that might be present in the underlying DBMS software or OS.

# How We Keep our Application Server Safe

SSH key authentication. Password authentication is disabled to protect against brute-force attacks.

We use strict firewall settings that only allow connections to port 443 from outside the VPC. Connections to port 22 are subject to an IP whitelist that only contains select administrators' IP addresses.

Credentials and API keys are stored in environment variables that only get shared between team members using [enterprise-grade password management software](https://www.lastpass.com/security/zero-knowledge-security).
# Hyperion Security Whitepaper

**Disclaimer:** Although we take security very seriously and implement all of the steps described below to the best of our abilities in order to secure your data, there is still a non-zero possibility that our systems could be compromised now or at any point in the future. We do not provide any guarantees or compensation in the event that our systems were to be compromised or breached in any way. Although our threat model includes many common types of attacks, it does not provide adequate security against advanced threats. Our whitepaper below describes some of the most important threat mitigation measures we take to secure our service, but are not exhaustive.

**Please read this before using our app:** We encourage all users to use our app on a sandboxed database instance that does not contain any sensitive data, using temporary non-superuser credentials. Even though we take steps to protect any potentially pre-existing data, you should avoid providing credentials for a database that contains sensitive data. By using our app, you acknowledge that there is a non-zero risk that your database could be compromised at any point in the future.

**If you find a security vulnerability:** Please report it immediately using the proper channels and by sending our team an email at <*support AT hyperionapp.com*> We will respond with 24 hours.

# How We Keep Accounts and Account Passwords Safe

## Password hashing
We hash passwords using bcrypt with a work factor setting of 12. These settings follow [OWASP recommendations for storing passwords](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html).

## Session security

Eash session is identified using a unique 128-bit UUID v4 identifier which is generated using a cryptographically secure UUID v4 generation algorithm.

Each session is linked to the IP address that initiated it. Any change in IP address for a given session will trigger an automatic logout. This helps reduce the risk of session hijacking.

## Enforcing 2FA by default

We enforce 2FA by default for all accounts by sending a randomly-generated code via email at each session login. The code is generated using a cryptographically-strong random string generation algorithm. Furthermore, sessions can only persist for a maximum of 7 days, after which the user will be required to log in again, prompting 2FA verification again. We recognize this might not be best from a UX standpoint, but given the nature of our service we strongly believe this is an appropriate tradeoff to keep our user's data safe.

# How We Keep Database Credentials Safe

We encrypt all database credentials using AES-256 in Galois-Counter Mode (GCM). We derive the 256-bit keys from the users' passwords by applying the PBKDF2 key-stengthening algorithm with an iteration setting of 310,000 and with an internal hash function setting of HMAC-SHA-256. These settings follow [OWASP recommendations](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html).

# How We Keep Data Safe in Transit

All data we receive and transmit is set to force TLSv1.2 and above, unless explicitly specified otherwise by the user in certain situations (which we strongly advise against but is nevertheless possible).

## Data transferred between the client and our application server

The data transferred between the client and our application server is encrypted using TLSv1.3 only, ensuring forward secrecy by default. If you client does not support TLSv1.3, you will not be able to use our app for security reasons, and encourage you to upgrade to a more recent version of your browser. 

## Data transferred between our application server and our database server 

Data transferred between our application server and our database server is encrypted using TLSv1.2 with a selected set of cipher suites that provide forward secrecy. 

## Data transferred between our systems and your provided database instance

Data transmitted between our servers and your provided database server are encrypted based on the SSL mode that you choose. We cannot guarantee that the data will be encrypted if you choose the 'Allow' or 'Prefer' settings, which we strongly dicourage. Instead, we highly recommend that you opt for 'Require', 'Verify-CA', or 'Verify-Full' as your SSL mode.

# How We Keep our Database Server Safe

Our database server is in the same Virtual Private Cluster (VPC) as our application server and is only available from inside that VPC. Any connections originating from outside the VPC will be blocked. We use strictly-defined security groups that only allow essential connections and select administrators to access the servers.

We take steps to scrub and sanitize all input data to reduce the risk of SQL injections. We cannot, however, protect against vulnerabilities that might be present in the underlying DBMS software or OS.

# How We Keep our Application Server Safe

We use strict firewall settings that only allow connections to port 443 from outside the VPC. Connections to port 22 are subject to an IP whitelist that only contains select administrators' IP addresses.

Credentials and API keys are stored in environment variables that only get shared between team members using [enterprise-grade password management software](https://www.lastpass.com/security/zero-knowledge-security).
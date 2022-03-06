### This script will NOT work unless you have enabled SSH key authentication for your machine 
### To enable SSH key authentication for your machine, you will need to upload your SSH public key to the server

echo "cd ~/hyperion/; git pull origin; pm2 restart server;" | ssh hyperion@hyperionapp.com 

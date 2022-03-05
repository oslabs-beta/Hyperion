### This script will NOT work unless you have enabled SSH key authentication for your machine 

echo "cd /home/hyperion/hyperion/; git pull origin; pm2 restart server;" | ssh hyperion@hyperionapp.com 

#!/bin/bash

# Whistle sunucusu ayaklanacak
w2 run --uiport 891 --httpPort 777 --httpsPort 888 --socksPort 999

# ssh ile soket açılabilir uzak sunucuya (sifre, kullanıcı ve ip adresi değiştirilebilir)
# sshpass -pSifre123 ssh -D 6000 ubuntu@192.168.13.50
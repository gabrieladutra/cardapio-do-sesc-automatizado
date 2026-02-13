### Cardápio do Sesc Automatizado  

Automação para capturar o cardápio diário e semanal do Sesc da Esquina, extrair o texto via OCR, detectar mudanças e enviar SMS automaticamente usando AWS.  
O SMS é mandado de segunda á sexta-feira ás 11:30 da manhã.</br>
Acesse https://menu.gabrieladutra.com para conferir o menu funcionando.

### Arquitetura

<p align="center">
  <img src="/assets/cloud.png" width="750" height="500"/>
</p>

### Aplicação

<p align="center">
  <img src="/assets/home.png" width="500" height="500"/>
</p>

### Envio de SMS 

O usuário recebe dois SMS's com o Menu Diário do Restaurante e da Lanchonete podendo saber e escolher antecipadamente em qual local almoçar.

<p align="center">
  <img src="/assets/smsPrint.jpeg" height="500"/>
</p>

---

### Tecnologias Utilizadas

#### Frontend

![React](https://img.shields.io/badge/React-3A3A3A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3A3A3A?style=for-the-badge&logo=tailwindcss&logoColor=38B2AC)

---

#### OCR & Processamento

![Tesseract.js](https://img.shields.io/badge/Tesseract.js-3A3A3A?style=for-the-badge&logo=tesseract&logoColor=white)
![Jimp](https://img.shields.io/badge/Jimp.js-3A3A3A?style=for-the-badge&logo=javascript&logoColor=yellow)
![Puppeteer](https://img.shields.io/badge/Puppeteer-3A3A3A?style=for-the-badge&logo=puppeteer&logoColor=40B5A4)

---

#### AWS Cloud Infrastructure

![AWS S3](https://img.shields.io/badge/AWS_S3-3A3A3A?style=for-the-badge&logo=AWSs3&logoColor=FF9900)
![AWS DynamoDB](https://img.shields.io/badge/AWS_DynamoDB-3A3A3A?style=for-the-badge&logo=AWSdynamodb&logoColor=4053D6)
![AWS Lambda](https://img.shields.io/badge/AWS_Lambda-3A3A3A?style=for-the-badge&logo=awslambda&logoColor=FF9900)
![AWS CloudWatch](https://img.shields.io/badge/AWS_CloudWatch-3A3A3A?style=for-the-badge&logo=AWScloudwatch&logoColor=FF4F8B)
![AWS EventBridge](https://img.shields.io/badge/AWS_EventBridge-3A3A3A?style=for-the-badge&logo=AWSeventbridge&logoColor=FF4F8B)
![AWS CloudFront](https://img.shields.io/badge/AWS_CloudFront-3A3A3A?style=for-the-badge&logo=AWScloudfront&logoColor=white)
![AWS Route 53](https://img.shields.io/badge/AWS_Route_53-3A3A3A?style=for-the-badge&logo=AWSroute53&logoColor=8C4FFF)
![AWS SNS](https://img.shields.io/badge/AWS_SNS-3A3A3A?style=for-the-badge&logo=AWSsns&logoColor=DD344C)


---

### Passos de Execução do Projeto

1. Capturar a imagem do cardápio do Sesc diariamente  
2. Recortar/limpar a imagem com **Jimp**  
3. Extrair o texto com **Tesseract.js (OCR)**  
4. Comparar com o cardápio anterior salvo no DynamoDB  
5. Enviar SMS via **AWS SNS** e Segunda á Sexta ás 11:30 
6. Controlar a execução da função **Lambda** de Segunda á Sexta ás 11:00 usando o **EventBridge**

---

### Objetivo 

Esse projeto foi idealizado para oferecer aos usuários as informações do menu de forma estruturada e rápida. Durante o desenvolvimento do site coloquei em prática os meus conhecimentos em frontend e backend. Conheci e utilizei novos serviços da AWS e ŕetendo adicionar novas funcionalidades e recuperar novas informações no futuro.
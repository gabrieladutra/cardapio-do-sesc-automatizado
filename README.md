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

![Amazon S3](https://img.shields.io/badge/Amazon_S3-3A3A3A?style=for-the-badge&logo=amazons3&logoColor=FF9900)
![Amazon DynamoDB](https://img.shields.io/badge/Amazon_DynamoDB-3A3A3A?style=for-the-badge&logo=amazondynamodb&logoColor=4053D6)
![AWS Lambda](https://img.shields.io/badge/AWS_Lambda-3A3A3A?style=for-the-badge&logo=awslambda&logoColor=FF9900)
![Amazon CloudWatch](https://img.shields.io/badge/Amazon_CloudWatch-3A3A3A?style=for-the-badge&logo=amazoncloudwatch&logoColor=FF4F8B)
![Amazon EventBridge](https://img.shields.io/badge/Amazon_EventBridge-3A3A3A?style=for-the-badge&logo=amazoneventbridge&logoColor=FF4F8B)
![Amazon CloudFront](https://img.shields.io/badge/Amazon_CloudFront-3A3A3A?style=for-the-badge&logo=amazoncloudfront&logoColor=white)
![Amazon Route 53](https://img.shields.io/badge/Amazon_Route_53-3A3A3A?style=for-the-badge&logo=amazonroute53&logoColor=8C4FFF)
![Amazon SNS](https://img.shields.io/badge/Amazon_SNS-3A3A3A?style=for-the-badge&logo=amazonsns&logoColor=DD344C)


---

### Objetivos

1. Capturar a imagem do cardápio do Sesc diariamente  
2. Recortar/limpar a imagem com **Jimp**  
3. Extrair o texto com **Tesseract.js (OCR)**  
4. Comparar com o cardápio anterior salvo no DynamoDB  
5. Enviar SMS via AWS SNS  
6. Controlar a execução da função **Lambda** de Segunda á Sexta ás 11:00 usando o **EventBridge**

---

#### Deploy
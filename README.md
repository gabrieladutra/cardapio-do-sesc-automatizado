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
  <img src="/assets/smsPrint.jpeg" width="500"/>
</p>




---

### Tecnologias Utilizadas

#### Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=38B2AC)

#### OCR & Processamento de Imagem

![Tesseract.js](https://img.shields.io/badge/Tesseract.js-5A4FCF?style=for-the-badge&logo=tesseract&logoColor=white)
![Jimp](https://img.shields.io/badge/Jimp.js-1C1C1C?style=for-the-badge&logo=javascript&logoColor=yellow)
![Puppeteer](https://img.shields.io/badge/Puppeteer-40B5A4?style=for-the-badge&logo=puppeteer&logoColor=white)

#### AWS

![Amazon S3](https://img.shields.io/badge/Amazon_S3-FF9900?style=for-the-badge&logo=amazons3&logoColor=white)
![Amazon DynamoDB](https://img.shields.io/badge/Amazon_DynamoDB-4053D6?style=for-the-badge&logo=amazondynamodb&logoColor=white)
![AWS Lambda](https://img.shields.io/badge/AWS_Lambda-FF9900?style=for-the-badge&logo=awslambda&logoColor=white)
![Amazon CloudWatch](https://img.shields.io/badge/Amazon_CloudWatch-FF4F8B?style=for-the-badge&logo=amazoncloudwatch&logoColor=white)
![Amazon EventBridge](https://img.shields.io/badge/Amazon_EventBridge-FF4F8B?style=for-the-badge&logo=amazoneventbridge&logoColor=white)
![Amazon CloudFront](https://img.shields.io/badge/Amazon_CloudFront-232F3E?style=for-the-badge&logo=amazoncloudfront&logoColor=white)
![Amazon Route 53](https://img.shields.io/badge/Amazon_Route_53-8C4FFF?style=for-the-badge&logo=amazonroute53&logoColor=white)
![Amazon SNS](https://img.shields.io/badge/Amazon_SNS-DD344C?style=for-the-badge&logo=amazonsns&logoColor=white)


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
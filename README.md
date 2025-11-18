## Cardápio do Sesc Automatizado  
Automação para capturar o cardápio diário do Sesc, extrair o texto via OCR, detectar mudanças e enviar SMS automaticamente usando AWS.  

<p align="center">
  <img src="./docs/arquitetura.png" width="750" />
</p>

---

### Tecnologias

![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js)
![AWS Lambda](https://img.shields.io/badge/AWS-Lambda-orange?logo=awslambda)
![DynamoDB](https://img.shields.io/badge/AWS-DynamoDB-4053D6?logo=amazondynamodb)
![SNS](https://img.shields.io/badge/AWS-SNS-DD344C?logo=amazonaws)
![EventBridge](https://img.shields.io/badge/AWS-EventBridge-FF4F8B?logo=amazonaws)
![OCR](https://img.shields.io/badge/OCR-Tesseract-blue)
![Status](https://img.shields.io/badge/Status-Operacional-brightgreen)

---

### Objetivos

1. Capturar a imagem do cardápio do Sesc diariamente  
2. Recortar/limpar a imagem com **Jimp**  
3. Extrair o texto com **Tesseract.js (OCR)**  
4. Comparar com o cardápio anterior salvo no DynamoDB  
5. Enviar SMS via AWS SNS  
6. Controlar a execução da função **Lambda** de Segunda á Sexta ás 11:00 usando o **EventBridge**


---

### Arquitetura

> Coloque a imagem final em:  
> `./docs/arquitetura.png`

```md
![Arquitetura](/assets/arch.drawio.png)

import { IBasket, IFormData, ITelegramData } from "types/basketTypes";

export default async function sendToTelegram(data: ITelegramData) {
    const TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_TOKEN;
    const CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;
    if (!TOKEN) {
        throw new Error("Define TOKEN environmental variable");
    }
    if (!CHAT_ID) {
        throw new Error("Define CHAT_ID environmental variable");
    }
    const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    const formData: IFormData = data.formData;

    let message = `<b>--- Заявка з сайту ---</b>\n`;
    message += `<b>Відправник: </b>${formData.name}\n`;
    message += `<b>Телефон: </b>${formData.phone}\n`;
    message += `<b>Спосіб доставки: </b>${formData.delivery}\n`;
    message += `<b>Коментар: </b>${formData.text ? formData.text : ""}\n`;
    message += `<b>Замовлення: </b>\n`;

    let itemSum = 0;
    let orderQuantity = 0;

    data.basketData.forEach((item: IBasket) => {
        message += `${item.title} ${item.name}, ${
            item.weight ? `${item.weight}г,` : ""
        } ${item.quantity} x ${item.price} грн\n`;
        orderQuantity += item.quantity;
        itemSum += +item.price * item.quantity;
    });
    message += `<b>Загалом позицій: </b>${orderQuantity}\n`;
    message += `<b>Всього на сумму: </b>${itemSum} грн`;

    return fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            parse_mode: "html",
            text: message,
        }),
    });
}

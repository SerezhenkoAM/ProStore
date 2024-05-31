<template>
    <div class="contract">
        <div v-if="step_1">
        <table>
            <tr>
                <td>Номер контракта</td>
                <td>{{ data.idContract }}</td>
            </tr>
            <tr>
                <td>Наименование товара</td>
                <td>{{ data.name }}</td>
            </tr>
            <tr>
                <td>Вес товара</td>
                <td>{{ data.weight }}</td>
            </tr>
            <tr>
                <td>Рзмеры товара</td>
                <td>{{ data.weight }}</td>
            </tr>
            <tr>
                <td>Координаты товара</td>
                <td>{{ data.place }}</td>
            </tr>
            
            <tr>
                <td>Окончание даты отгрузки</td>
                <td>{{ data.date_shipment }}</td>
            </tr>
        </table>
        <button @click="to_step_2">Начать отгрузка товара</button>
    </div>
        <div class="step_2" v-if="step_2">
            <h3>Этап 2: Сканирование товара</h3>
            <StreamBarcodeReader @decode="onDecode" @loaded="onLoaded"></StreamBarcodeReader>
        </div>
        <div class="step_3" v-if="step_3">
            <h3>Этап 3: Изменить статус заказа</h3>
            <button @click="to_step_3">Закончить отгрузку</button>
        </div>
    </div>
</template>
<script>
import { StreamBarcodeReader } from "vue-barcode-reader"
export default {
    name: 'ContractComp',
    props: {
        data: Object
    },
    components: {
        StreamBarcodeReader
    },
    data() {
        return {
            step_1: true,
            step_2: false,
            step_3: false
        }
    },
    methods: {
        to_step_2() {
            this.step_1 = false
            this.step_2 = true
        },
        onDecode(result) {
            if (this.data.barcode === result) {
                this.step_2 = false
                this.step_3 = true
            } else {
                alert("Товар не найден")
            }
        },
        to_step_3() {
            fetch('http://localhost:3000/complete_contract', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({idContract: this.data.idContract})
            })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.request == 'success') {
                    location.reload()
                } else {
                    alert('Ошибка вставки данных')
                }
            })
            .catch(err => console.log(err))
        }
    }
}
</script>
<style scoped lang='less'>
.contract {
    border: 2px solid black;
    border-radius: 20px;
}
table {
    width: 100%;
    padding: 10px 0;
}
tr, td {
    font-size: 18px;
    padding: 3px 0;
    text-align: left;
    padding-left: 20px;
}
button {
    background-color: white;
    width: 100%;
    border: none;
    border-top: 2px solid black;
    border-radius: 0 0 20px 20px;
    font-size: 18px;
    padding: 18px 0;
    cursor: pointer;
}
</style>
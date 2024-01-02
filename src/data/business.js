import { observable, action, makeObservable, runInAction, toJS } from "mobx";
import axios from "axios";
class Business {
    business;
    constructor() {
        makeObservable(this, {
            business: observable,
            getBusiness: action,
            postBusiness: action
        });
        this.getBusiness();
    }
    getBusiness() {
        axios.get("http://localhost:8787/businessData").then((res) => {
            runInAction(() => {
                this.business = res.data;
            })
            // console.log(JSON.stringify(this.business))
            // JSON.stringify(this.business)=={}
            // JSON.stringify
            // console.log(this.business.name);
            if (this.business.name ==undefined) {
                this.postBusiness({
                    "name": "Tamarina",
                    "address": "Zamba 3 Bnei-Brak",
                    "phone": "0527180820",
                    "owner": "Tamar Cohen",
                    "logo": "src/commponents/admin/Logo2.jpg",
                    "description": "N641935@gmail.com"

                });
            }
            // console.log(res.data);
            // console.log(JSON.stringify(this.business));
        }).catch((error) => {
            console.log(error);
        });

    }
    postBusiness(busi) {
        axios.post('http://localhost:8787/businessData', busi).then((res) => {
            runInAction(() => {
                this.business = busi;
            })
            console.log(this.business);
            console.log(res.data);
        }).catch((error) => {
            console.log(error);
        });
    }
}
export default new Business();


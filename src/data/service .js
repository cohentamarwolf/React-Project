import { observable, action, makeObservable, runInAction, toJS } from "mobx";
import axios from "axios";
class Service {
    servicesList = [];
    count = 0;
    constructor() {
        makeObservable(this, {
            servicesList: observable,
            getServicesList: action,
            postService: action
        });
        this.getServicesList();
    }
    getServicesList() {
        axios.get("http://localhost:8787/services").then((res) => {
            runInAction(() => {
                this.servicesList = res.data;
            })
            if (toJS(this.servicesList.length == 0)) {
                this.postService({
                    id: "1",
                    name: "Villa interior design",
                    description: "A meeting with an architect specializing in interior design for villas",
                    price: 500,
                    duration: 120,
                    image:"https://www.keinan-arch.com/wp-content/uploads/2023/05/%D7%A2%D7%99%D7%A6%D7%95%D7%91-%D7%A4%D7%A0%D7%99%D7%9D-%D7%91%D7%99%D7%AA-%D7%9E%D7%95%D7%9C-%D7%94%D7%99%D7%9D-%D7%91%D7%90%D7%A9%D7%A7%D7%9C%D7%95%D7%9F-41-1146x764.jpg"
                });
                this.postService({
                    id: "2",
                    name: "Interior design for the kitchen",
                    description: "Interior design for the kitchen",
                    price: 1000,
                    duration: 180,
                    image: "https://wallsmag.co.il/wp-content/uploads/2023/08/2-%D7%9E%D7%98%D7%91%D7%97-1.jpg",
                });
                this.postService({
                    id: "3",
                    name: "Bedroom interior design",
                    description: "A meeting with an architect specializing in bedroom design",
                    price: 2000,
                    duration: 60,
                    image: "https://www.keinan-arch.com/wp-content/uploads/2023/07/%D7%A2%D7%99%D7%A6%D7%95%D7%91-%D7%A4%D7%A0%D7%99%D7%9D-%D7%93%D7%95-%D7%9E%D7%A9%D7%A4%D7%97%D7%AA%D7%99-%D7%91%D7%90%D7%A9%D7%A7%D7%9C%D7%95%D7%9F-23-357x205.jpg",
                });
                this.postService({
                    id: "4",
                    name: "Interior design for the living room",
                    description: "A meeting with an architect specializing in living room design",
                    price: 1000,
                    duration: 30,
                    image: "https://www.keinan-arch.com/wp-content/uploads/2018/02/%D7%A4%D7%A0%D7%98%D7%94%D7%90%D7%95%D7%96-%D7%91%D7%A8%D7%A2%D7%A0%D7%A0%D7%94-6.jpg",
                });
            }
        }).catch((error) => {
            console.log(error);
        });

    }
    postService(service) {
        this.count++;
        service.id = this.count;
        return new Promise((resolve, reject) => {
            axios.post('http://localhost:8787/service', service)
                .then((res) => {
                    if (res.status === 200) {
                        runInAction(() => {
                            this.servicesList.push(service);
                        });
                        console.log(service);
                    } else {
                        console.error("Service was not added. Unexpected status:", res.status);
                    }
                    resolve(res.status); // Resolve with the status code
                })
                .catch((error) => {
                    // console.error("Error adding meeting:", error);
                    reject(error); // Reject with the error for further handling
                });
        });
    }
    // postService(service) {
    //     this.count++;
    //     service.id = this.count;
    //     axios.post('http://localhost:8787/service', service).then((res) => {
    //         runInAction(() => {
    //             this.servicesList.push(service);
    //         })
    //         console.log(service);
    //         console.log( this.servicesList);
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    // }

}
export default new Service();


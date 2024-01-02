import { observable, action, makeObservable, runInAction, toJS } from "mobx";
import axios from 'axios'
class Meeting {
    meetingsList = [];
    constructor() {
        makeObservable(this, {
            meetingsList: observable,
            getMeetingsList: action,
            postMeeting: action
        });
        this.getMeetingsList();

    }
    getMeetingsList() {
        axios.get("http://localhost:8787/appointments").then((res) => {
            runInAction(() => {
                this.meetingsList = res.data;
            })
            if (toJS(this.meetingsList.length == 0)) {
                this.postMeeting({
                    serviceName: "Interior design for the kitchen",
                    serviceDescription: "A meeting with an architect specializing in bedroom design",
                    servicePrice: 2000,
                    dateTime: "2024-02-20T10:00:00.000Z",
                    clientName: "Abi Cohen",
                    clientPhone: "050-1234567",
                    clientEmail: "m@m.com",
                });
                this.postMeeting({
                    serviceName: "Villa interior design",
                    serviceDescription: "A meeting with an architect specializing in interior design for villas",
                    servicePrice: 500,
                    dateTime: "2024-01-03T12:00:00.000Z",
                    clientName: "Shlomo Levi",
                    clientPhone: "03-5222222",
                    clientEmail: "info@poalim.co.il",
                });
                this.postMeeting({
                    serviceName: "Villa interior design",
                    serviceDescription: "A meeting with an architect specializing in interior design for villas",
                    servicePrice: 500,
                    dateTime: "2024-02-20T11:00:00.000Z",
                    clientName: "Shlomo Man",
                    clientPhone: "03-5232222",
                    clientEmail: "info@man.co.il",
                });
                this.postMeeting({
                    serviceName: "Interior design for the kitchen",
                    serviceDescription: "A meeting with an architect specializing in bedroom design",
                    servicePrice: 2000,
                    dateTime: "2024-01-02T12:00:00.000Z",
                    clientName: "Rami Cohen",
                    clientPhone: "050-3234567",
                    clientEmail: "m@r.com",
                });
                this.postMeeting({
                    serviceName: "Interior design for the living room",
                    serviceDescription: "A meeting with an architect specializing in living room design",
                    servicePrice: 1000,
                    dateTime: "2025-10-20T18:00:00.000Z",
                    clientName: "Ploni Ltd.",
                    clientPhone: "03-7777777",
                    clientEmail: "info@ploni.co.il",
                });
            }
            console.log(res.data);
        }).catch((error) => {
            // console.log(error);
            return error.response.status;
        });

    }

    //
    //
    postMeeting(meeting) {
        return new Promise((resolve, reject) => {
            axios.post("http://localhost:8787/appointment", meeting)
                .then((res) => {
                    if (res.status === 200) {
                        runInAction(() => {
                            this.meetingsList.push(meeting);
                        });
                    } else {
                        console.error("Meeting was not added. Unexpected status:", res.status);
                    }
                    resolve(res.status); // Resolve with the status code
                })
                .catch((error) => {
                    // console.error("Error adding meeting:", error);
                    reject(error); // Reject with the error for further handling
                });
        });
    }
    //
    //
    // postMeeting(meet) {
    //     return axios.post('http://localhost:8787/appointment', meet)
    //         .then((res) => {
    //             runInAction(() => {
    //                 this.meetingsList.push(meet);
    //             })
    //             return res; // Return the response
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //             return null; // Or return an error object
    //         });
    // }
    // postMeeting(meet) {
    //     return axios.post('http://localhost:8787/appointment', meet).then((res) => {
    //         runInAction(() => {
    //             this.meetingsList.push(meet);
    //         })
    //         console.log(meet);
    //         console.log(res);

    //     }).catch((error) => {
    //         console.log(error);
    //     });
    // }
}
export default new Meeting();
//
// getMeetingsList() {
//     axios.get("http://localhost:8787/appointments").then((res) => {
//         runInAction(() => {
//             this.meetingsList = res.data;
//         })
//         if (toJS(this.meetingsList.length == 0)) {
//             this.postMeeting({
//                 serviceName: "Consultation",
//                 serviceDescription: "Consultation with Yair Katz",
//                 servicePrice: 500,
//                 dateTime: "2021-06-20T10:00:00.000Z",
//                 clientName: "Abi Cohen",
//                 clientPhone: "050-1234567",
//                 clientEmail: "m@m.com",
//             });
//             this.postMeeting({
//                 serviceName: "Lecture",
//                 serviceDescription: "Lecture on digital marketing",
//                 servicePrice: 1000,
//                 dateTime: "2022-07-20T12:00:00.000Z",
//                 clientName: "Bank Hapoalim",
//                 clientPhone: "03-5222222",
//                 clientEmail: "info@poalim.co.il",
//             });
//             this.postMeeting({
//                 serviceName: "Phone call",
//                 serviceDescription: "Phone call with a client",
//                 servicePrice: 200,
//                 dateTime: "2023-08-20T14:00:00.000Z",
//                 clientName: "Guy Levi",
//                 clientPhone: "054-3333333",
//                 clientEmail: "g@g.com",
//             });
//             this.postMeeting({
//                 serviceName: "Personal meeting",
//                 serviceDescription: "Personal meeting with a client",
//                 servicePrice: 300,
//                 dateTime: "2024-09-20T16:00:00.000Z",
//                 clientName: "Mical Ben Haim",
//                 clientPhone: "053-4444444",
//                 clientEmail: "m@b.com",
//             });
//             this.postMeeting({
//                 serviceName: "Business consulting",
//                 serviceDescription: "Business consulting for a new company",
//                 servicePrice: 4000,
//                 dateTime: "2025-10-20T18:00:00.000Z",
//                 clientName: "Ploni Ltd.",
//                 clientPhone: "03-7777777",
//                 clientEmail: "info@ploni.co.il",
//             });
//         }
//         console.log(res.data);
//     }).catch((error) => {
//         // console.log(error);
//         return
//     });

// }
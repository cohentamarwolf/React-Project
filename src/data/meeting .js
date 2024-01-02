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
            return error.response.status;
        });

    }

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
                    reject(error); // Reject with the error for further handling
                });
        });
    }
}
export default new Meeting();

'use strict';

class UserInfo {

    constructor(userName, userInfo) {
        this.name = userName;
        this.info = userInfo;
    }

    setUserInfo() {
        /** REVIEW: Можно лучше:
         *   Не обьявлен аргумент event. Использование window.event считается устаревшим и может приводить к ошибкам
         **/
        event.preventDefault();
        this.name = editForm.name.value;
        this.info = editForm.info.value;
    }

    updateUserInfo(event) {
        event.preventDefault();
        this.setUserInfo();
        name.textContent = this.name;
        info.textContent = this.info;
    }
}

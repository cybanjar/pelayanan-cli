export default {
    UA_ADMIN: function () {
        const userStore = JSON.parse(sessionStorage.getItem("users"));

        if (userStore["level"] != "admin") {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("users");
            root.$router.push({ path: "/" });
            window.location.reload();
        }
    }
}
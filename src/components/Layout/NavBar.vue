<template>
    <div class="header">
        <img src="../../assets/img/icon-512x512.png" />
        <div>
            <div class="User">MS</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    }
}
</script>

<style lang="scss" scoped>
.header {
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 1rem;
    padding-left: 1rem;
    top: 0;
    width: 100vw;
    height: 3rem;
    background: rgb(255, 255, 255);
    box-shadow: 0px 7px 15px -7px #0000004b;
    img {
        width: 4rem;
    }
}

.User {
    border: 2px solid #008c9e;
    padding: 1rem;
    width: 2rem;
    height: 2rem;
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

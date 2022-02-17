<template>
    <div>
        <div class="Dropdown">
            <div>Teste</div>
        </div>
        <div class="Drop"></div>
    </div>
</template>

<script>
export default {
    name: 'DropDown',
    data() {
        return {}
    }
}
</script>

<style lang="scss" scoped>
.Dropdown {
    position: absolute;
    background-color: red;
    right: 0;
    top: 0;
    margin-top: 3rem;
    border-radius: 0.5rem;
    width: 7rem;
    height: 8rem;
}
.Drop {
    background-color: blue;
    width: 1rem;
    height: 1rem;
    margin-top: 2rem;
    right: 10px;
    top: 0;
    position: absolute;
}
</style>

<template>
    <div data-aos="fade-right">
        <div class="Profile">
            <div class="CardProfile">
                <div>
                    <vs-switch v-model="colorMode"></vs-switch>
                    <vs-switch v-model="language"></vs-switch>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Profile',
    data() {
        return {
            colorMode: true,
            language: true
        }
    }
}
</script>

<style scoped lang="scss">
.Profile {
    padding: 0rem 1rem;
}

.CardProfile {
    box-shadow: 0px 0px 10px -5px #0000004b;
    background-color: #fff;
    padding: 1rem;
    border-radius: 1rem;
}
</style>

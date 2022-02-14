<template>
    <div
        class="mt-3"
        style="
            height: 5.5rem;
            box-shadow: 0px 0px 10px -5px #0000004b;
            overflow: hidden !important;
        "
    >
        <div class="Task">
            <div class="TaskBody">
                <h2>{{ data.group }}</h2>
            </div>
        </div>
    </div>
</template>

<script>
import { Hooper, Slide } from 'hooper'

export default {
    name: 'GroupedTask',
    components: { Hooper, Slide },
    props: {
        data: {
            type: Object,
            default: null
        }
    },
    data() {
        return {}
    }
}
</script>

<style scoped lang="scss">
.Read {
    text-decoration: line-through;
}

.Task {
    width: 100vw;
    height: 5.5rem;
    padding: 0.3rem 0.7rem;
    background-color: rgb(255, 206, 206);
    display: flex;
    .TaskBody {
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>

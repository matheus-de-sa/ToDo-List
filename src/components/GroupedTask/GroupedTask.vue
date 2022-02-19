<template>
    <div
        class="mt-3"
        style="height: 5.5rem; box-shadow: 0px 0px 10px -5px #0000004b"
        @click="$router.push(`/group/${data.group}`)"
    >
        <div class="Task">
            <div class="TaskBody">
                <h2 class="mb-0">{{ data.group }}</h2>
                <div class="TaskCard">
                    <div
                        v-if="countTasksReads > 0"
                        class="ml-1 BadgeTasks colorBlue"
                    >
                        {{ countTasksReads }}
                    </div>
                    <div v-if="countTasks > 0" class="ml-1 BadgeTasks colorRed">
                        {{ countTasks }}
                    </div>
                </div>
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
    },
    computed: {
        countTasks() {
            let result = this.data.data

            let count = 0

            result.forEach((task) => {
                if (!task.read) count += 1
            })

            return count < 10 ? `0${count}` : count
        },
        countTasksReads() {
            let result = this.data.data

            let count = 0

            result.forEach((task) => {
                if (task.read) count += 1
            })

            return count < 10 ? `0${count}` : count
        }
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
    background-color: var(--color-background-white);
    display: flex;
    .TaskBody {
        width: 100vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--color-text);
        .TaskCard {
            display: flex;
            color: var(--color-dark);
        }
        .BadgeTasks {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 1rem;
            font-weight: 700;
            &.colorBlue {
                background-color: var(--color-background-blue);
            }
            &.colorRed {
                background-color: var(--color-background-red);
            }
        }
    }
}
</style>

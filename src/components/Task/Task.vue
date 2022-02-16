<template>
    <hooper
        class="mt-3"
        :ref="`Task-${data.id}`"
        :wheelControl="false"
        :initialSlide="1"
        :itemsToShow="1"
        style="
            height: 5.5rem;
            box-shadow: 0px 0px 10px -5px #0000004b;
            overflow: hidden !important;
        "
        @slide="updateCarousel"
        :shortDrag="false"
        :trimWhiteSpace="true"
    >
        <slide>
            <div
                class="ReadTask"
                :style="!read ? '' : 'background-color: #4D40FF'"
            >
                <div v-if="!read" class="ReadBody">
                    <div>Concluído</div>
                    <div><i class="bx bx-check-double"></i></div>
                </div>
                <div v-else class="ReadBody">
                    <div>Remover Marcação</div>
                    <i class="bx bx-x"></i>
                </div>
            </div>
        </slide>
        <slide>
            <div
                class="Task"
                :style="read ? 'background-color: rgb(224, 224, 240)' : ''"
            >
                <div class="TaskBody">
                    <div class="TaskText" :class="read ? 'Read' : ''">
                        <h6>{{ data.title }}</h6>
                        <span>{{ data.description }}</span>
                    </div>
                    <div class="TaksInfo">
                        <div v-date-format="data.date"></div>
                        <div class="Icon">
                            <i
                                v-if="data.type === 'task'"
                                class="ml-1 bx bx-task"
                                style="color: #3bb574fb"
                            ></i>
                            <i
                                v-if="data.type === 'event'"
                                class="ml-1 bx bx-calendar-event"
                                style="color: rgb(218, 33, 33)"
                            ></i>
                            <i
                                v-if="data.type === 'reminder'"
                                class="ml-1 bx bx-receipt"
                                style="color: #4d40ff"
                            ></i>
                        </div>
                    </div>
                </div>
            </div>
        </slide>
        <slide>
            <div class="DelTask">
                <div class="DelBody">
                    <div>Excluír</div>
                    <div><i class="bx bx-trash"></i></div>
                </div>
            </div>
        </slide>
    </hooper>
</template>

<script>
import { Hooper, Slide } from 'hooper'
import db from '../../firebase/db'

export default {
    name: 'Task',
    components: { Hooper, Slide },
    props: {
        data: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            read: false,
            carouselData: 1
        }
    },
    mounted() {
        if (this.data.read) this.read = true
    },
    watch: {
        carouselData(data) {
            this.$refs[`Task-${this.data.id}`].slideTo(this.carouselData)

            if (data === 2) this.delTask()
            if (data === 0) this.readTask()
        }
    },
    methods: {
        slidePrev() {
            this.$refs[`Task-${this.data.id}`].slidePrev()
        },
        slideNext() {
            this.$refs[`Task-${this.data.id}`].slideNext()
        },
        updateCarousel(payload) {
            this.carouselData = payload.currentSlide
        },
        async delTask() {
            await db.delTask(
                'Users',
                this.$store.getters.getUser.uid,
                this.data.group ? 'Group' : null,
                this.data.id
            )

            let user = ['Users', this.$store.getters.getUser.uid]
            const groups = await db.readGrouped(user[0], user[1])
            const tasks = await db.readTasks(user[0], user[1])
            const groupedTasks = await db.readGroupedTasks(user[0], user[1])
            const allTasks = await db.readAllTasks(user[0], user[1])

            this.$store.dispatch('addGroups', groups)
            this.$store.dispatch('addTasks', tasks)
            this.$store.dispatch('addGroupedTasks', groupedTasks)
            this.$store.dispatch('addAllTasks', allTasks)

            setTimeout(() => {
                this.slidePrev()
            }, 800)
        },
        async readTask() {
            let data = {
                read: true
            }

            if (this.read) {
                data.read = false
            }

            await db.setReadTask(
                'Users',
                this.$store.getters.getUser.uid,
                this.data.group ? 'Group' : null,
                this.data.id,
                data
            )

            setTimeout(() => {
                this.slideNext()
                if (this.read) {
                    this.read = false
                } else {
                    this.read = true
                }
            }, 800)
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
    background-color: #fff;
    display: flex;
    .TaskBody {
        width: 100vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .TaskText {
            text-align: start;
            h6 {
                font-weight: 600;
                font-size: 1rem;
                word-break: break-all;
            }
            span {
                font-size: 0.8rem;
                word-break: break-all;
            }
        }
        .TaksInfo {
            text-align: end;
            i {
                margin-top: 1rem;
                font-weight: 500;
                font-size: 1.3rem;
            }
            div {
                font-size: 0.7rem;
                font-weight: 600;
            }
        }
    }
}

.ReadTask {
    background-color: #46ce85fb;
    width: 100vw;
    height: 5.5rem;
    padding: 1rem 4rem;
    display: flex;
    justify-content: start;
    align-items: center;
    color: #fff;
    .ReadBody {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        div {
            font-size: 1.3rem;
        }
        i {
            font-size: 1.3rem;
        }
    }
}

.DelTask {
    background-color: rgb(221, 63, 63);
    width: 100vw;
    height: 5.5rem;
    padding: 1rem 4rem;
    display: flex;
    justify-content: end;
    align-items: center;
    color: #fff;
    .DelBody {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        div {
            font-size: 1.3rem;
        }
        i {
            font-size: 1.3rem;
        }
    }
}

.hooper {
    height: none !important;
}
.IconReadTada {
    display: none;
}
.IconTrashTada {
    display: none;
}

.NotificationTrash {
    border-bottom-left-radius: 1rem;
    border-top-left-radius: 1rem;
    padding: 0.3rem 1rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: end;
    background-color: rgb(218, 33, 33);
    color: #fff;
    text-align: end;
    &:hover > .IconTrashTada {
        display: block !important;
    }
    &:hover > .IconTrash {
        display: none;
    }
}
.NotificationRead {
    border-bottom-right-radius: 1rem;
    border-top-right-radius: 1rem;
    padding: 0.3rem 1rem;
    margin-left: 1rem;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: start;
    background-color: #3bb574fb;
    color: #fff;
    text-align: start;
    &:hover > .IconReadTada {
        display: block !important;
    }
    &:hover > .IconRead {
        display: none;
    }
}
.NotificationTop {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .Title {
        font-size: 0.9rem;
        font-weight: 550;
        color: rgb(44, 44, 44);
    }
    .Date {
        font-size: 0.9rem;
        font-weight: 550;
        color: rgb(44, 44, 44);
    }
}
.NotificationFooter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .Text {
        font-size: 0.8rem;
        width: 90%;
        font-weight: 400;
    }
    .Icon {
        text-align: end;
        color: #3bb573;
        width: 10%;
    }
}
</style>

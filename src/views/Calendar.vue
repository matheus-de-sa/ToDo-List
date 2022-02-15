<template>
    <div>
        <div class="Calendar">
            <div class="CardCalendar">
                <v-calendar
                    @update:from-page="changeMonth($event)"
                    @dayclick="changeDate($event)"
                    color="teal"
                    :attributes="attributes"
                    title-position="left"
                >
                    <template #day-popover="{ dayTitle, attributes }">
                        <div
                            class="text-xs text-gray-300 font-semibold text-center"
                        >
                            {{ dayTitle }}
                        </div>
                        <popover-row
                            v-for="attr in attributes"
                            :key="attr.key"
                            :attribute="attr"
                        >
                            <span
                                :style="
                                    attr.customData.read
                                        ? 'text-decoration: line-through'
                                        : ''
                                "
                                >{{ attr.customData.title }}</span
                            >
                        </popover-row>
                    </template>
                </v-calendar>
                <div
                    class="mt-3 d-flex justify-content-between aling-items-center"
                >
                    <div>
                        <i style="color: #3bb574fb" class="mr-1 bx bx-task"></i>
                        <span>Tarefas</span>
                    </div>
                    <div>
                        <i
                            style="color: rgb(218, 33, 33)"
                            class="mr-1 bx bx-calendar-event"
                        ></i>
                        <span>Eventos</span>
                    </div>
                    <div>
                        <i
                            style="color: #4d40ff"
                            class="mr-1 bx bx-receipt"
                        ></i>
                        <span>Lembretes</span>
                    </div>
                </div>
                <div class="mt-3">
                    <div class="d-flex month">{{ months[month] ? months[month].name : '' }}</div>
                    <div v-for="(day, index) in tasks" :key="index">
                        <div class="d-flex flex-column">
                            <div class="d-flex my-2 day">{{ day.day }}</div>
                            <div
                                class="d-flex align-items-center ml-2"
                                v-for="item in day.data"
                                :key="item.id"
                            >
                                <i
                                    v-if="item.type === 'task'"
                                    style="color: #3bb574fb"
                                    :class="item.read ? 'opacity-50' : ''"
                                    class="mr-1 bx bx-task"
                                ></i>
                                <i
                                    v-if="item.type === 'event'"
                                    style="color: rgb(218, 33, 33)"
                                    class="mr-1 bx bx-calendar-event"
                                    :class="item.read ? 'opacity-50' : ''"
                                ></i>
                                <i
                                    v-if="item.type === 'reminder'"
                                    style="color: #4d40ff"
                                    class="mr-1 bx bx-receipt"
                                    :class="item.read ? 'opacity-50' : ''"
                                ></i>
                                <span
                                    :style="
                                        item.read
                                            ? 'text-decoration: line-through'
                                            : ''
                                    "
                                    >{{ item.title }}</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PopoverRow from 'v-calendar/lib/components/popover-row.umd.min'
import moment from 'moment'
import { groupBy } from 'lodash'

export default {
    name: 'Calendar',
    components: {
        PopoverRow
    },
    data() {
        return {
            day: '',
            month: '',
            attributes: [
                {
                    dot: true,
                    popover: {},
                    dates: new Date()
                }
            ],
            months: {
                1: { name: 'Janeiro' },
                2: { name: 'Fevereiro' },
                3: { name: 'Março' },
                4: { name: 'Abril' },
                5: { name: 'Maio' },
                6: { name: 'Junho' },
                7: { name: 'Julho' },
                8: { name: 'Agosto' },
                9: { name: 'Setembro' },
                10: { name: 'Outubro' },
                11: { name: 'Novembro' },
                12: { name: 'Dezembro' }
            }
        }
    },
    async mounted() {
        this.month = new Date().getMonth() + 1

        let data = this.allTasks

        this.attributes = [
            ...data.map((todo) => ({
                dates: todo.date,
                dot: {
                    color: todo.color,
                    class: todo.read ? 'opacity-50' : ''
                },
                popover: {
                    label: todo.title,
                    visibility: 'click'
                },
                customData: todo
            }))
        ]
    },
    computed: {
        allTasks() {
            return this.$store.getters.getAllTasks
        },
        tasks() {
            let dates = this.allTasks
            let result = []

            dates = dates.sort((a, b) => a.date - b.date)

            dates.forEach((item) => {
                if (
                    moment(item.date).format('MM') ===
                    (this.month < 10 ? `0${this.month}` : this.month)
                ) {
                    result.push(item)
                }
            })

            const test = groupBy(result, (i) => {
                return moment(i.date).format('DD')
            })

            if (this.day > 0) {
                return [
                    {
                        day: this.day,
                        data: test[this.day]
                    }
                ]
            } else {
                return Object.keys(test).map((item) => {
                    return {
                        day: item,
                        data: test[item]
                    }
                })
            }
        }
    },
    methods: {
        changeDate(date) {
            if (date.day === this.day) this.day = ''
            else this.day = date.day
        },
        changeMonth(date) {
            this.day = ''
            this.month = date.month
        }
    }
}
</script>

<style>
.opacity-50 {
    opacity: 50%;
}
</style>

<style lang="scss" scoped>
.month {
    font-size: 1.1rem;
    font-weight: 600;
}

.day {
    border-top: 1px solid rgba(0, 0, 0, 0.5);
    font-size: 1.1rem;
    font-weight: 600;
}

.Calendar {
    padding: 0rem 1rem;
}

.CardCalendar {
    box-shadow: 0px 0px 10px -5px #0000004b;
    background-color: #fff;
    padding: 1rem;
    border-radius: 1rem;
}
</style>

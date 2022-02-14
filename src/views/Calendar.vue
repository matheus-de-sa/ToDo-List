<template>
    <div data-aos="fade-right">
        <div class="Calendar">
            <div class="CardCalendar">
                <v-calendar
                    @dayclick="changeDate($event)"
                    color="teal"
                    :attributes="attributes"
                    title-position="left"
                />
                <div class="mt-3 d-flex" v-for="item in tasks" :key="item.id">
                    <div class="mr-2">
                        <i
                            class="bx bxs-circle"
                            :style="`color: ${item.color}`"
                        ></i>
                    </div>
                    <div>
                        {{ item.title }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import db from '../firebase/db'
import moment from 'moment'
import { groupBy } from 'lodash'

export default {
    name: 'Calendar',
    data() {
        return {
            dates: [],
            month: '',
            attributes: [
                {
                    dot: true,
                    popover: {},
                    dates: new Date()
                }
            ]
        }
    },
    async mounted() {
        this.month = new Date().getMonth() + 1

        let data = await db.readAllTasks(
            'Users',
            this.$store.getters.getUser.uid
        )

        this.dates = data

        this.attributes = [
            ...data.map((todo) => ({
                dates: todo.date,
                dot: {
                    color: todo.color,
                    class: todo.read ? 'opacity-30' : ''
                },
                popover: {
                    label: todo.title
                },
                customData: todo
            }))
        ]
    },
    computed: {
        tasks() {
            let dates = this.dates
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

            return result
        }
    },
    methods: {
        changeDate(date) {
            console.log(date)
        }
    }
}
</script>

<style lang="scss" scoped>
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

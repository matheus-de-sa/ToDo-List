<template>
    <div :data-aos="transition">
        <div class="Task">
            <div class="CardAddTask">
                <h5>Criar Tarefa</h5>
                <div class="Input">
                    <label
                        class="LabelInput"
                        :class="title.length > 0 ? 'LabelSelect' : ''"
                        for="Title"
                        >Título</label
                    >
                    <vs-input
                        @change="testDataInput"
                        id="Title"
                        autocomplete="off"
                        primary
                        type="text"
                        v-model="title"
                        placeholder="Digite o título"
                    >
                    </vs-input>
                </div>
                <div class="Input">
                    <label
                        class="LabelInput"
                        :class="description.length > 0 ? 'LabelSelect' : ''"
                        for="TextArea"
                        >Descrição</label
                    >
                    <div class="LabelTextArea">
                        <textarea
                            autocomplete="off"
                            @change="testDataInput"
                            v-model="description"
                            class="textArea"
                            id="TextArea"
                            rows="3"
                        ></textarea>
                        <label
                            v-show="description.length === 0"
                            class="fontTextAreaEmpty"
                            for="TextArea"
                            >Digite a descrição</label
                        >
                    </div>
                </div>
                <div>
                    <label
                        class="LabelInput"
                        :class="group.length > 0 ? 'LabelSelect' : ''"
                        for="Group"
                        >Grupo</label
                    >
                    <div class="InputLabel">
                        <input
                            autocomplete="off"
                            @change="testDataInput"
                            id="Group"
                            v-model="group"
                            class="inputPerso"
                            list="lista"
                            type="text"
                        />
                        <datalist class="dataList" id="lista">
                            <option
                                v-for="(item, index) in dataGroups"
                                :key="index"
                                :value="item"
                            >
                                {{ item }}
                            </option>
                        </datalist>
                        <label
                            v-show="group.length === 0"
                            class="fontTextAreaEmpty"
                            for="Group"
                            >Digite ou selecione o grupo</label
                        >
                    </div>
                </div>
                <div>
                    <label
                        class="LabelInput"
                        :class="type.length > 0 ? 'LabelSelect' : ''"
                        for="Group"
                        >Tipo</label
                    >
                    <div class="InputRadio">
                        <div class="DivRadio">
                            <input
                                v-model="type"
                                type="radio"
                                id="task"
                                name="task"
                                value="task"
                                checked
                            />
                            <label for="task"
                                >Tarefa<i
                                    style="color: #3bb574fb"
                                    class="ml-1 bx bx-task"
                                ></i
                            ></label>
                        </div>
                        <div class="DivRadio">
                            <input
                                v-model="type"
                                type="radio"
                                id="event"
                                name="event"
                                value="event"
                                checked
                            />
                            <label for="event"
                                >Evento<i
                                    style="color: rgb(218, 33, 33)"
                                    class="ml-1 bx bx-calendar-event"
                                ></i
                            ></label>
                        </div>
                        <div class="DivRadio">
                            <input
                                v-model="type"
                                type="radio"
                                id="reminder"
                                name="reminder"
                                value="reminder"
                                checked
                            />
                            <label for="reminder"
                                >Lembrete<i
                                    style="color: #4d40ff"
                                    class="ml-1 bx bx-receipt"
                                ></i
                            ></label>
                        </div>
                    </div>
                </div>
                <div>
                    <label
                        class="LabelInput"
                        :class="date.length > 0 ? 'LabelSelect' : ''"
                        for="Group"
                        >Data</label
                    >
                    <div>
                        <vs-input
                            @change="testDataInput"
                            id="Title"
                            primary
                            type="date"
                            v-model="date"
                            placeholder="Digite o título"
                        >
                        </vs-input>
                    </div>
                </div>
                <div class="mt-4">
                    <vs-button
                        :disabled="!testData"
                        @click="addTask"
                        :loading="loading"
                        class="Button"
                        flat
                    >
                        <i class="bx bx-task mr-1"></i>
                        Cadastrar Task
                    </vs-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import db from '../firebase/db'
import moment from 'moment'

export default {
    name: 'Task',
    data() {
        return {
            title: '',
            description: '',
            group: '',
            date: '',
            type: 'task',
            loading: false,
            testData: false
        }
    },
    async mounted() {
        let date = new window.Date().getDate()
        let month = new window.Date().getMonth()
        let year = new window.Date().getFullYear()

        month = month + 1
        month = month + 1 < 10 ? `0${month}` : month

        this.date = `${year}-${month}-${date}`
    },
    computed: {
        dataGroups() {
            return this.$store.getters.getGroups
        },
        transition() {
            let route = this.$store.getters.getRoute
            let transition = 'fade-top'

            if (route === 'Calendar') transition = 'fade-left'
            if (route === 'Home') transition = 'fade-right'

            return transition
        }
    },
    methods: {
        async addTask() {
            try {
                if (this.testData) {
                    this.loading = true

                    let crypto = require('crypto')
                    let id = 'a' + crypto.randomBytes(8).toString('hex')

                    let data = {
                        id: id,
                        title: this.title,
                        description: this.description,
                        group: this.group || null,
                        date: Number(moment(this.date).format('x')),
                        read: false,
                        type: this.type || 'task'
                    }

                    let result = await db.writeTask(
                        'Users',
                        this.$store.getters.getUser.uid,
                        this.group || null,
                        id,
                        data
                    )

                    if (result) {
                        let user = ['Users', this.$store.getters.getUser.uid]
                        const groups = await db.readGrouped(user[0], user[1])
                        const tasks = await db.readTasks(user[0], user[1])
                        const groupedTasks = await db.readGroupedTasks(
                            user[0],
                            user[1]
                        )
                        const allTasks = await db.readAllTasks(user[0], user[1])

                        console.log(groups)
                        console.log(tasks)
                        console.log(groupedTasks)
                        console.log(allTasks)

                        this.$store.dispatch('addGroups', groups)
                        this.$store.dispatch('addTasks', tasks)
                        this.$store.dispatch('addGroupedTasks', groupedTasks)
                        this.$store.dispatch('addAllTasks', allTasks)

                        this.loading = false
                        this.testData = false
                        this.title = ''
                        this.description = ''
                        this.group = ''

                        let date = new window.Date().getDate()
                        let month = new window.Date().getMonth()
                        let year = new window.Date().getFullYear()

                        month = month + 1
                        month = month + 1 < 10 ? `0${month}` : month

                        this.date = `${year}-${month}-${date}`
                    }
                }
            } catch (error) {
                this.loading = false
                console.log(error)
            }
        },
        testDataInput() {
            if (this.title.length > 0 && this.date.length > 0) {
                this.testData = true
            } else {
                this.testData = false
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.InputRadio {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .DivRadio {
        margin: 0rem 0.5rem;
        display: flex;
        align-items: center;
        input {
        }
        label {
            display: flex;
            align-items: center;
            margin-left: 0.2rem;
            margin-bottom: 0rem;
        }
    }
}

.Button {
    width: 100%;
}

.InputLabel {
    position: relative;
    .inputPerso {
        color: var(--color-text);
        padding: 7px 10px;
        background-color: var(--color-background-body);
        border-radius: 12px;
        border: 1px solid transparent;
        width: 100%;
        &:focus-visible {
            padding: 7px 13px;
            outline: none;
            border-bottom: 2px var(--color-blue) solid;
        }
    }
    .fontTextAreaEmpty {
        transition: all 0.25s ease;
        padding: 7px 0px;
        left: 13px;
        position: absolute;
        font-size: 0.8rem;
        opacity: 0.4;
    }
}

.inputPerso:focus-visible ~ .fontTextAreaEmpty {
    opacity: 0;
}

.textArea:focus-visible ~ .fontTextAreaEmpty {
    opacity: 0;
}

.LabelTextArea {
    position: relative;
    .textArea {
        color: var(--color-text);
        padding: 7px 10px;
        background-color: var(--color-background-body);
        border: 1px solid transparent;
        border-radius: 12px;
        width: 100%;
        transition: all 0.05s ease;
        &:focus-visible {
            padding: 7px 13px;
            outline: none;
            border-bottom: 2px var(--color-blue) solid;
        }
    }
    .fontTextAreaEmpty {
        transition: all 0.25s ease;
        padding: 7px 0px;
        left: 13px;
        position: absolute;
        font-size: 0.8rem;
        opacity: 0.4;
    }
}

.LabelSelect {
    color: var(--color-blue);
}

.LabelInput {
    margin: 0.5rem 0.5rem;
    width: 100%;
    text-align: start;
    font-size: 0.9rem;
}

.Task {
    padding: 0rem 1rem;
}

.CardAddTask {
    box-shadow: 0px 0px 10px -5px #0000004b;
    background-color: var(--color-background-white);
    color: var(--color-text);
    padding: 1rem;
    border-radius: 1rem;
}
</style>

<style>
.vs-input__label {
    width: 80%;
}

.vs-input--has-icon ~ .vs-input__label {
    left: 44px;
}
.vs-input {
    width: 100%;
}
.vs-button {
    margin: 0%;
}
</style>

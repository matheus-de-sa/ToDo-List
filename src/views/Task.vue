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
                    <div>
                        <textarea
                            @change="testDataInput"
                            v-model="description"
                            class="textArea"
                            name=""
                            id="TextArea"
                            rows="5"
                        ></textarea>
                        <label
                            v-show="description.length === 0"
                            class="fontTextAreaEmpty"
                            for="TextArea
                    "
                            >Digite a descrição</label
                        >
                    </div>
                </div>
                <div>
                    <label
                        class="LabelInput"
                        :class="description.length > 0 ? 'LabelSelect' : ''"
                        for="Group"
                        >Grupo</label
                    >
                    <div>
                        <input
                            @change="testDataInput"
                            id="Group"
                            v-model="group"
                            class="inputPerso"
                            list="lista"
                            type="text"
                        />
                        <datalist class="dataList" id="lista">
                            <option value="sdsa">sdsa</option>
                            <option value="asdsad">asdsad</option>
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
                        :class="description.length > 0 ? 'LabelSelect' : ''"
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
            loading: false,
            testData: false
        }
    },
    mounted() {
        let date = new window.Date().getDate()
        let month = new window.Date().getMonth()
        let year = new window.Date().getFullYear()

        month = month + 1
        month = month + 1 < 10 ? `0${month}` : month

        this.date = `${year}-${month}-${date}`
    },
    computed: {
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
                    let data = {
                        title: this.title,
                        description: this.description,
                        group: this.group,
                        date: Number(moment(this.date).format('x'))
                    }

                    const result = await db.writeDoc(
                        'Users',
                        this.$store.getters.getUser.uid,
                        'Tasks',
                        false,
                        data
                    )

                    console.log(result)
                }
            } catch (error) {
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
.Button {
    width: 100%;
}

.dataList {
    background-color: red;
}

.inputPerso {
    color: rgb(44, 62, 80);
    padding: 7px 10px;
    background-color: rgb(244, 247, 248);
    border-radius: 12px;
    border: 1px solid transparent;
    width: 100%;
    &:focus-visible {
        padding: 7px 13px;
        outline: none;
        border-bottom: 2px #008c9e solid;
    }
}

.inputPerso:focus-visible ~ .fontTextAreaEmpty {
    opacity: 0;
}

.textArea {
    color: rgb(44, 62, 80);
    padding: 7px 10px;
    background-color: rgb(244, 247, 248);
    border: 1px solid transparent;
    border-radius: 12px;
    width: 100%;
    transition: all 0.05s ease;
    &:focus-visible {
        padding: 7px 13px;
        outline: none;
        border-bottom: 2px #008c9e solid;
    }
}

.textArea:focus-visible ~ .fontTextAreaEmpty {
    opacity: 0;
}

.fontTextAreaEmpty {
    transition: all 0.25s ease;
    padding: 7px 0px;
    left: 44px;
    position: absolute;
    font-size: 0.8rem;
    opacity: 0.4;
}

.LabelSelect {
    color: #008c9e;
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
    background-color: #fff;
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

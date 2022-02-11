<template>
    <div :data-aos="transition">
        <div class="Task">
            <div class="CardAddTask">
                <h5>Criar Tarefa</h5>
                <div class="Input">
                    <label class="LabelInput" :class="'LabelSelect'" for="text"
                        >Título</label
                    >
                    <vs-input
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
                        :class="'LabelSelect'"
                        for="Password"
                        >Descrição</label
                    >
                    <div>
                        <textarea
                            v-model="description"
                            class="textArea"
                            name=""
                            id=""
                            rows="5"
                            placeholder=""
                        ></textarea>
                        <label
                            v-show="description.length === 0"
                            class="fontTextAreaEmpty"
                            for="textArea
                    "
                            >Digite a descrição</label
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Task',
    data() {
        return {
            title: '',
            description: ''
        }
    },
    computed: {
        transition() {
            let route = this.$store.getters.getRoute
            let transition = 'fade-top'

            if (route === 'Calendar') transition = 'fade-left'
            if (route === 'Home') transition = 'fade-right'

            return transition
        }
    }
}
</script>

<style lang="scss" scoped>
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

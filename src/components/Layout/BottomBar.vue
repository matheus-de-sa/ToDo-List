<template>
    <div class="Footer">
        <div class="Nav">
            <div
                @click="route = ''"
                :class="route === '' ? 'linkActive' : ''"
                class="NavList"
            >
                <i class="bx bx-list-ul"></i>
                <span v-if="route === ''">Lista</span>
            </div>
            <div @click="route = 'add'" class="NavAdd">
                <div
                    :class="route === 'add' ? 'linkActiveAdd' : ''"
                    class="Icon"
                >
                    <i class="bx bx-plus"></i>
                </div>
            </div>
            <div
                @click="route = 'calendar'"
                :class="route === 'calendar' ? 'linkActive' : ''"
                class="NavCalendar"
            >
                <i class="bx bx-calendar"></i>
                <span v-if="route === 'calendar'">Calendário</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            route: ''
        }
    }
}
</script>

<style scoped lang="scss">
.Footer {
    position: fixed;
    bottom: 0;
    width: 100vw;
    height: 3rem;
    background: rgb(255, 255, 255);
    box-shadow: 0px -7px 15px -7px #0000004b;
}
.Nav {
    height: 3.5rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.NavAdd {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3.5rem;
    background: rgb(76, 99, 233);
    padding: 0.5rem;
    border-top-left-radius: 50rem;
    border-top-right-radius: 50rem;
    margin-bottom: 1rem;
    box-shadow: 0px -7px 15px -7px #0000004b;
}

.Icon {
    display: flex;
    background: rgb(255, 255, 255);
    border-top-left-radius: 50rem;
    border-top-right-radius: 50rem;
    padding: 0.5rem;
}

.NavList {
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    i {
        font-size: 1.5rem;
        line-height: 0.9rem !important;
    }
    span {
        font-size: 0.8rem;
    }
}

.NavCalendar {
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    i {
        font-size: 1.5rem;
        line-height: 0.9rem !important;
    }
    span {
        font-size: 0.8rem;
    }
}

.linkActive {
    transition: all 0.4s ease;
    color: rgb(76, 99, 233);
}

.linkActiveAdd {
    transition: all 0.4s ease;
    box-shadow: inset 0 0 0 2.5rem rgb(76, 99, 233);
    background: none;
    color: #fff;
}
</style>

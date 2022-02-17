<template>
    <div class="Footer">
        <div id="activeIcon" class="activeIcon"></div>
        <div class="Nav">
            <div
                id="Home"
                @click="changeRoute('/')"
                :class="route === 'Home' ? 'linkActive' : ''"
                class="NavList"
            >
                <i class="bx bx-list-ul"></i>
                <span v-show="route === 'Home'">Lista</span>
            </div>
            <div id="Task" @click="changeRoute('/task')" class="NavAdd">
                <div
                    :class="route === 'Task' ? 'linkActiveAdd' : ''"
                    class="Icon"
                >
                    <i class="bx bx-plus"></i>
                </div>
            </div>
            <div
                id="Calendar"
                @click="changeRoute('/calendar')"
                :class="route === 'Calendar' ? 'linkActive' : ''"
                class="NavCalendar"
            >
                <i class="bx bx-calendar"></i>
                <span v-show="route === 'Calendar'">Calendário</span>
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
    },
    mounted() {
        this.route = this.$route.meta.title

        this.changeRoute(this.route === 'Home' ? '/' : this.route)
    },
    watch: {
        $route() {
            this.route = this.$route.meta.title

            if (this.route === 'Calendar') {
                let { left } = document
                    .getElementById('Calendar')
                    .getBoundingClientRect()

                document.getElementById('activeIcon').style.left = `${left}px`
            } else if (this.route === 'Home') {
                let { left } = document
                    .getElementById('Home')
                    .getBoundingClientRect()
                document.getElementById('activeIcon').style.left = `${left}px`
            } else {
                let { left } = document
                    .getElementById('Task')
                    .getBoundingClientRect()
                document.getElementById('activeIcon').style.left = `${
                    left + 10
                }px`
            }
        }
    },
    methods: {
        changeRoute(route) {
            if (route !== this.$route.path) this.$router.push(route)

            if (route === '/calendar') {
                let { left } = document
                    .getElementById('Calendar')
                    .getBoundingClientRect()

                document.getElementById('activeIcon').style.left = `${left}px`
            } else if (route === '/') {
                let { left } = document
                    .getElementById('Home')
                    .getBoundingClientRect()
                document.getElementById('activeIcon').style.left = `${left}px`
            } else {
                let { left } = document
                    .getElementById('Task')
                    .getBoundingClientRect()
                document.getElementById('activeIcon').style.left = `${
                    left + 10
                }px`
            }
        }
    }
}
</script>

<style scoped lang="scss">
.activeIcon {
    position: absolute;
    left: 0px;
    bottom: 0;
    background-color: var(--color-background-blue);
    width: 4rem;
    height: 0.3rem;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    margin-bottom: 3rem;
    transition: all 0.4s ease;
}

.Footer {
    position: fixed;
    bottom: 0;
    width: 100vw;
    height: 3rem;
    background: var(--color-background-white);
    box-shadow: 0px -7px 15px -7px #0000004b;
}
.Nav {
    height: 3.5rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.NavAdd {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3.5rem;
    background: var(--color-background-blue);
    padding: 0.5rem;
    border-top-left-radius: 50rem;
    border-top-right-radius: 50rem;
    margin-bottom: 1rem;
    box-shadow: 0px -7px 15px -7px #0000004b;
}

.Icon {
    display: flex;
    background: var(--color-background-white);
    color: var(--color-text);
    border-top-left-radius: 50rem;
    border-top-right-radius: 50rem;
    padding: 0.5rem;
}

.NavList {
    margin-right: 3rem;
    width: 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--color-text);
    i {
        font-size: 1.5rem;
        line-height: 1rem !important;
    }
    span {
        font-size: 0.8rem;
        transition: all 0.4s ease;
    }
}

.NavCalendar {
    margin-left: 3rem;
    width: 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--color-text);
    i {
        font-size: 1.4rem;
        line-height: 1rem !important;
    }
    span {
        font-size: 0.8rem;
        transition: all 0.4s ease;
    }
}

.linkActive {
    transition: all 0.4s ease;
    color: var(--color-blue);
}

.linkActiveAdd {
    transition: all 0.4s ease;
    box-shadow: inset 0 0 0 2.5rem var(--color-blue);
    background: none;
    color: var(--color-white);
}
</style>

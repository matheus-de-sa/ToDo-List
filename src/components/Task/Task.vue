<template>
    <hooper
        class="mt-3"
        :ref="`hooper`"
        :initialSlide="1"
        :itemsToShow="1"
        style="height: 5.5rem; box-shadow: 0px 0px 10px -5px #0000004b"
        @slide="updateCarousel"
        :shortDrag="false"
        :trimWhiteSpace="true"
    >
        <slide>
            <div class="ReadTask">
                <div class="ReadBody">
                    <div>Concluído</div>
                    <div><i class="bx bx-check-double"></i></div>
                </div>
            </div>
        </slide>
        <slide>
            <div class="Task">
                <div class="TaskBody">
                    <div class="TaskText">
                        <h6>Título</h6>
                        <span
                            >Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Exercitationem quis sunt, quas delectus
                            tempora</span
                        >
                    </div>
                    <div class="TaksInfo">
                        <i class="bx bx-check-double"></i>
                        <div class="d-none">09/02/2022</div>
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

export default {
    name: 'Task',
    components: { Hooper, Slide },
    data() {
        return {
            read: false,
            carouselData: 1
        }
    },
    watch: {
        carouselData(data) {
            this.$refs[`hooper`].slideTo(this.carouselData)

            if (data === 0) this.delNotification()
            if (data === 2) this.readNotification()
        }
    },
    methods: {
        slidePrev() {
            this.$refs[`hooper`].slidePrev()
        },
        slideNext() {
            this.$refs[`hooper`].slideNext()
        },
        updateCarousel(payload) {
            this.carouselData = payload.currentSlide
        },
        delNotification() {
            setTimeout(() => {
                this.slideNext()
            }, 800)
        },
        readNotification() {
            setTimeout(() => {
                this.slidePrev()
            }, 800)
        }
    }
}
</script>

<style scoped lang="scss">
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
            padding-right: 0.5rem;
            text-align: start;
            h6 {
                font-weight: 500;
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
            padding-left: 0.5rem;
            i {
                font-weight: 500;
                font-size: 1.3rem;
                color: #46ce85fb;
            }
            div {
                font-size: 0.7rem;
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

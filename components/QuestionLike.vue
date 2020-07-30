<template>
    <li class="d-table w-100">
        <div class="stats-txt d-table-cell w-50">
            <a href="#" @click.prevent="likeIt" v-if="$auth.loggedIn">
                <template>
                    <span>
                        <i class="fas fa-heart fa-2x text-danger"></i>
                    </span>
                </template>
            </a>
        </div>
        <div class="stats-num d-table-cell w-50 text-right">
            <a href="#">{{ count }} Likes</a>
        </div>
    </li>
</template>

<script>
export default {
    props: ['question'],
    data() {
        return {
            liked: false,
            count: 0
        };
    },
    created(){
    },
    methods: {
        likeIt(){
            this.liked ? this.incr() : this.decr()
            this.liked = !this.liked
        },
        incr(){
            this.count++
        },
        decr(){
            this.count--
        },
        likeQuestion(){
            this.$axios.post(`/questions/${this.question.id}/like`)
        },
        checkIfCurrentUserLikes(){
            this.$axios.$get(`/questions/${this.question.id}/liked`)
        }
    }
};
</script>

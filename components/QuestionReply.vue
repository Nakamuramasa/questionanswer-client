<template>
    <li class="clearfix">
        <div class="comment-thumb float-left">
            <img :src="reply.user.photo_url" />
        </div>
        <div class="comment-meta">
            <h3 class="font-16 fw-500 mb-2">
                {{ reply.user.username }}
            </h3>
            <p class="font-14 fw-300 mb-2">
                {{ reply.body }}
            </p>

            <span class="font-14 fw-300">
                {{ reply.created_at_dates.created_at_human }}
                <span>
                    <a class="d-flex justify-content-end mr-4 mb-2" href="#" @click.prevent="likeReply()" v-if="$auth.loggedIn">
                        <div v-if="liked">
                            <i class="fas fa-heart text-danger"></i>
                        </div>
                        <div v-else>
                            <i class="fas fa-heart"></i>
                        </div>
                        <p class="text-right">
                            {{ reply.likes_count }}
                        </p>
                    </a>
                    <span class="d-flex justify-content-end" v-if="$auth.loggedIn && $auth.user.id == reply.user.id">
                        <a href="#" @click.prevent="destroyReply" class="text-danger">
                            Delete
                        </a>
                    </span>
                </span>
            </span>
        </div>
    </li>
</template>

<script>
export default {
    props: ['reply'],
    data(){
        return {
            liked: this.reply.liked,
            count: this.reply.likes_count
        };
    },
    methods: {
        likeReply(){
            this.$axios.post(`/replies/${this.reply.id}/like`)
            .then(res => {
                this.reply.liked = !this.reply.liked;
                this.reply.likes_count = res.data.total;
            });
        },
        destroyReply(){
            this.$axios.delete(`/replies/${this.reply.id}`)
            .then(res => this.$emit('deleted', this.reply.id))
            .catch(e => console.log(e))
        }
    }
};
</script>

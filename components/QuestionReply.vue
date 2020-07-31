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

            <span class="font-14 fw-300 d-flex justify-content-between">
                {{ reply.created_at_dates.created_at_human }}
                <span>
                    <a href="#" @click.prevent="likeReply()" v-if="$auth.loggedIn">
                        <i class="fas fa-heart text-danger float-left"></i>
                    </a>
                    <p class="font-15 fw-400 mb-3">
                        {{ reply.likes_count }}
                    </p>
                    <span v-if="$auth.loggedIn && $auth.user.id == reply.user.id">
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
        likeIt(){
            this.liked ? this.decr() : this.incr()
            this.liked = !this.liked
        },
        incr(){
            this.count++
        },
        decr(){
            this.count--
        },
        likeReply(){
            this.$axios.post(`/replies/${this.reply.id}/like`)
            .then(res => this.reply.likes_count = res.data.total)
            .catch(e => console.log(e))
        },
        destroyReply(){
            this.$axios.delete(`/replies/${this.reply.id}`)
            .then(res => this.$emit('deleted', this.reply.id))
            .catch(e => console.log(e))
        }
    }
};
</script>

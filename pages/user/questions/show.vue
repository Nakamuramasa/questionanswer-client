<template>
    <section class="post-details mt-4 pb-5">
        <div class="container">
            <div class="row">
                <!-- LEFT -->
                <div class="col-md-9">
                    <div class="card">
                        <div class="card-header">
                            {{ question.title }}
                        </div>
                        <div class="card-body">
                            <p class="card-text">{{ question.body }}</p>
                        </div>
                    </div>

                    <!-- Design Comments -->
                    <div class="design-comments mt-3">
                        <h1 class="font-16 fw-300 mb-4">
                            <strong class="fw-500">
                                {{ replies.length }} replies
                            </strong>
                        </h1>
                        <ul class="comment-list">
                            <QuestionReply
                                v-for="reply in replies"
                                :key="reply.id"
                                :reply="reply"
                                @deleted="handleDelete"
                            ></QuestionReply>
                        </ul>
                    </div>

                    <template v-if="$auth.loggedIn">
                        <form @submit.prevent="save">
                            <base-textarea
                                :rows="2"
                                :form="form"
                                field="body"
                                v-model.trim="form.body"
                                placeholder="Enter a Reply"
                            ></base-textarea>
                            <div class="mt-2 text-right">
                                <base-button
                                    :loading="form.busy"
                                    size="sm"
                                >Post Reply</base-button>
                            </div>
                        </form>
                    </template>
                    <!--/ END COMMENTS-->
                </div>

                <!-- RIGHT -->
                <div class="col-md-3">
                    <div class="post-detail-sidebar">
                        <div class="modal-user-meta white-bg-color">
                                <img
                                    :src="question.user.photo_url"
                                    class="float-left"
                                />
                            <div class="modal-user-detail">
                                <h1 class="font-13 fw-500 mt-1">
                                    {{ question.user.username }}
                                </h1>
                                <p class="font-12 fw-300 mt-2 mb-1">
                                    {{ question.created_at_dates.created_at_human }}
                                </p>
                            </div>
                        </div>

                        <div class="designs-tag-outer mt-3">
                            <h2 class="font-16 fw-500 mb-2">
                                Tags
                            </h2>
                            <div
                                class="designs-tag font-14 fw-300"
                            >
                                <a href="#" title="3D">3D</a>
                                <a href="#" title="among trees"
                                    >among trees</a
                                >
                                <a href="#" title="birds"
                                    >birds</a
                                >
                                <a href="#" title="environment"
                                    >environment</a
                                >
                                <a href="#" title="forest"
                                    >forest</a
                                >
                                <a href="#" title="night"
                                    >night</a
                                >
                                <a href="#" title="stylized"
                                    >stylized</a
                                >
                                <a href="#" title="sunset"
                                    >sunset</a
                                >
                                <a href="#" title="survival"
                                    >survival</a
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import QuestionReply from '@/components/QuestionReply';
export default {
    components: {
        QuestionReply,
    },
    data(){
        return {
            form: this.$vform({
                body: ''
            })
        }
    },
    async asyncData({ $axios, params }){
        try{
            const response = await $axios.$get(`/questions/slug/${params.slug}`);
            return { question: response.data, replies: response.data.replies };
        }catch(err){
            if(err.response.status === 404){
                error({statusCode: 404, message: "Question not found"});
            }else if(err.response.status === 401){
                redirect('/login');
            }else{
                error({statusCode: 500, message: "Internal server error"});
            }
        }
    },
    methods: {
        handleDelete(id){
            this.replies = this.replies.filter(r => r.id !== id);
        },
        save(){
            this.form.post(`questions/${this.question.id}/replies`)
            .then(res => {
                this.form.reset()
                this.replies = [...this.replies, res.data.data]
            })
            .catch(e => console.log(e));
        }
    }
}
</script>

<template>
    <div>
        <section class="hero text-center bg-secondary mb-4 text-white">
            <div class="container">
                <h1 class="font-28 fw-600 text-uppercase">
                    Update Question
                </h1>
            </div>
        </section>

        <div class="container">
            <div class="card">
                <div class="card-body">
                    <form class="auth-form" @submit.prevent="submit">
                        <alert-success :form="form">
                            Question succesfully updated
                        </alert-success>
                        <div class="form-group">
                            <base-input
                                :form="form"
                                field="title"
                                v-model="form.title"
                                placeholder="Enter a title"
                            ></base-input>
                        </div>
                        <div class="form-group">
                            <client-only>
                                <input-tag
                                    v-model="form.tags"
                                    placeholder="Tags separated by commas"
                                    add-tag-on-keys=188
                                ></input-tag>
                            </client-only>
                        </div>
                        <div class="form-group">
                            <base-textarea
                                :form="form"
                                field="body"
                                v-model="form.body"
                                placeholder="Enter a question"
                            ></base-textarea>
                        </div>
                        <div class="text-right">
                            <nuxt-link :to="{name: 'user.dashboard'}">Cancel</nuxt-link>
                            <base-button :loading="form.busy">
                                Update Question
                            </base-button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    middleware: ['auth'],
    data(){
        return {
            form: this.$vform({
                title: '',
                body: '',
                tags: []
            })
        };
    },
    async asyncData({ $axios, params, error, redirect }){
        try{
            const question = await $axios.$get(`/questions/${params.id}/byUser`);
            return { question: question.data };
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
    mounted(){
        if(this.question){
            Object.keys(this.form).forEach(key => {
                if(this.question.hasOwnProperty(key)){
                    this.form[key] = this.question[key];
                }
            });
            this.form.tags = this.question.tag_list.tags || [];
        }
    },
    methods: {
        submit(){
            this.form.put(`/questions/${this.$route.params.id}`)
            .then(res =>  {
                setTimeout(() => {
                    this.$router.push({ name: 'user.dashboard' })
                }, 2000);
            })
            .catch(err => console.log(err.response))
        }
    }
};
</script>

<template>
    <div>
        <section class="hero text-center bg-secondary mb-4 text-white">
            <div class="container">
                <h1 class="font-28 fw-600 text-uppercase">
                    Ask Question
                </h1>
            </div>
        </section>

        <div class="container">
            <div class="card">
                <div class="card-body">
                    <form class="auth-form" @submit.prevent="submit">
                        <alert-success :form="form">
                            Question succesfully submited
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
                            <base-input
                                :form="form"
                                field="body"
                                v-model="form.body"
                                placeholder="Enter a body"
                            ></base-input>
                        </div>
                        <div class="text-right">
                            <base-button :loading="form.busy">
                                Update Design
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
            const question = await $axios.$get(`/questions/${params.id}`);
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
    methods: {}
};
</script>

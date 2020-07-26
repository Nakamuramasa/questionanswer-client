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
    methods: {
        submit(){
            this.form.post('/questions')
            .then(res => {
                setTimeout(() => {
                    this.$router.push({ name: 'index' })
                }, 1000);
            })
            .catch(err => console.log(err.response))
        }
    }
};
</script>

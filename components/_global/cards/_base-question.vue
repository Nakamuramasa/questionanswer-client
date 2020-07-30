<template>
    <section class="cards-block">
        <div class="container">
            <a :href="`/question/${question.slug}`">
                <div class="card border-secondary mb-3">
                    <div class="card-header text-dark">
                        {{ question.title }}
                    </div>
                    <div class="card-body">
                        <h5 class="card-title text-secondary mb-3 d-flex">
                            <img :src="question.user.photo_url" width="18" class="profile rounded mr-2">
                            {{ question.user.username }} said {{ question.created_at_dates.created_at_human }}
                        </h5>
                        <p class="card-text mb-0 text-dark">{{ question.body }}</p>
                    </div>
                    <div class="card-footer text-muted">
                        <ul class="font-14 fw-400 list-inline text-light-gray">
                            <li class="pt-0 list-inline-item">
                                <i class="fas fa-heart"></i>
                                {{ question.likes_count }}
                            </li>
                            <li class="pt-0 list-inline-item">
                                <i class="fas fa-comments"></i>
                                {{ question.replies_count }}
                            </li>
                        </ul>
                    </div>
                </div>
            </a>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        question: {
            type: Object,
            required: true
        },
    }
}
</script>

<template>
  <div class="confession-container">
    <!-- Animated Background Elements -->
    <div class="animated-background">
      <div v-for="i in 20" :key="`chocolate-${i}`" class="chocolate" :style="getRandomStyle('chocolate')"></div>
      <div v-for="i in 15" :key="`heart-${i}`" class="heart" :style="getRandomStyle('heart')">❤️</div>
      <div v-for="i in 10" :key="`rose-${i}`" class="rose" :style="getRandomStyle('rose')">🌹</div>
    </div>

    <!-- Main Content -->
    <div class="content-wrapper">
      <h1 class="title">SSC Confession Room</h1>
      <p class="theme">Vibes of Love, Laughter and Friendship: A CFCI Valentine's Celebration</p>
      
      <UCard class="confession-card">
        <UForm :state="formState" @submit="submitConfession" class="confession-form">
          <UFormGroup label="Your Confession" name="confession">
            <UTextarea
              v-model="formState.confession"
              placeholder="Share your confession here..."
              :rows="8"
              size="xl"
              class="confession-textarea"
              required
            />
          </UFormGroup>
          
          <UButton
            type="submit"
            color="pink"
            size="lg"
            :loading="isSubmitting"
            class="submit-button"
            block
          >
            {{ isSubmitting ? 'Sending...' : 'Send Confession' }}
          </UButton>
        </UForm>

        <UAlert
          v-if="alertMessage"
          :color="alertType"
          :title="alertType === 'success' ? 'Success!' : 'Error'"
          :description="alertMessage"
          class="mt-4"
          @close="alertMessage = ''"
        />
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()

const formState = reactive({
  confession: ''
})

const isSubmitting = ref(false)
const alertMessage = ref('')
const alertType = ref<'success' | 'error'>('success')

const getRandomStyle = (type: string) => {
  const size = type === 'chocolate' ? 30 : type === 'heart' ? 25 : 35
  const duration = 10 + Math.random() * 20
  const delay = Math.random() * 5
  const left = Math.random() * 100
  
  return {
    left: `${left}%`,
    width: `${size}px`,
    height: `${size}px`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`
  }
}

const submitConfession = async () => {
  if (!formState.confession.trim()) {
    alertMessage.value = 'Please enter a confession before submitting.'
    alertType.value = 'error'
    return
  }

  isSubmitting.value = true
  alertMessage.value = ''

  try {
    const { data, error } = await supabase
      .from('confessions')
      .insert([
        {
          confession: formState.confession.trim(),
          created_at: new Date().toISOString()
        }
      ])
      .select()

    if (error) throw error

    alertMessage.value = 'Your confession has been sent successfully! 💕'
    alertType.value = 'success'
    formState.confession = ''
  } catch (error: any) {
    console.error('Error submitting confession:', error)
    alertMessage.value = error.message || 'Failed to send confession. Please try again.'
    alertType.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.confession-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #ff9ecb 0%, #ffc0d9 25%, #ffb3d9 50%, #ff9ecb 75%, #ffc0d9 100%);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animated-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.chocolate, .heart, .rose {
  position: absolute;
  opacity: 0.7;
  animation: float linear infinite;
}

.chocolate {
  background: #8B4513;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.heart, .rose {
  font-size: inherit;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
}

@keyframes float {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.7;
  }
  90% {
    opacity: 0.7;
  }
  100% {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
}

.content-wrapper {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 600px;
  text-align: center;
}

.title {
  font-size: 3rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  margin-bottom: 1rem;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.theme {
  font-size: 1.2rem;
  color: #fff;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
  margin-bottom: 2rem;
  font-style: italic;
}

.confession-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  padding: 2rem;
}

.confession-textarea {
  font-size: 1rem;
}

.submit-button {
  margin-top: 1rem;
  font-size: 1.1rem;
  font-weight: bold;
}

@media (max-width: 640px) {
  .title {
    font-size: 2rem;
  }
  
  .theme {
    font-size: 1rem;
  }
  
  .confession-card {
    padding: 1.5rem;
  }
}
</style>

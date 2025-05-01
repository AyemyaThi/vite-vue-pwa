<template>
    <p v-show="!_app_installed" class="add-to-home">
        Add This App to Your Home Screen > 
        <button @click="installPWA">Install</button>
    </p>

    <p v-show="_app_installed">
        Progressive Web Application Installed.
    </p>

</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const
    _install_ready = ref(false),
    _app_installed = ref(false);
let deferredPrompt: Event | null = null

onMounted(() => {
    window.addEventListener('beforeinstallprompt', savePrompt)
    window.addEventListener('appinstalled', handleAppInstalled)
})

onBeforeUnmount(()=>{
    window.removeEventListener("beforeinstallprompt", savePrompt);
    window.removeEventListener("appinstalled", handleAppInstalled);
})

const savePrompt = (e: Event) => {
    e.preventDefault();
    deferredPrompt = e as any //save the event, to activate it later
    _install_ready.value = true //Notify UI that the app can be installed
}

const installPWA = async () => {
    if(!deferredPrompt) return

    const promptEvent = deferredPrompt as any
    promptEvent.prompt() //trigger the installation prompt to the user

    //const result = await promptEvent.userChoice
    const { outcome } = await promptEvent.userChoice  //userChoice: Returns a promise that resolves to an object like { outcome: "accepted" | "dismissed" }

    if(outcome === 'accepted') {
        console.log('PWA installed')
    } else {
        console.log('PWA install dismissed')
    }
}

const handleAppInstalled = () => {
    deferredPrompt = null
    _app_installed.value = true
}

</script>
<style scoped>
.add-to-home {
    position: fixed;
    bottom: 20px;
    right: 20px;
}

button {
    background: #42b883;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}
</style>
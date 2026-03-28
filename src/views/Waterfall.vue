<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { debounce } from '../debounce'

interface WaterfallItem {
  id: number
  image: string
  title: string
  height: number
  color: string
}

const COLUMN_COUNT = 4
const ITEMS_PER_LOAD = 12
const SCROLL_THRESHOLD = 200
const LOAD_DELAY = 500
const MIN_ITEM_HEIGHT = 150
const MAX_ITEM_HEIGHT_ADD = 200
const MAX_ITEMS = 200

const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
  '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F',
  '#BB8FCE', '#85C1E9', '#F8B500', '#00CED1'
] as const

const items = ref<WaterfallItem[]>([])
const columnCount = ref(COLUMN_COUNT)
const columns = ref<WaterfallItem[][]>([[], [], [], []])
const loading = ref(false)

const generateRandomItem = (id: number): WaterfallItem => {
  const height = Math.floor(Math.random() * MAX_ITEM_HEIGHT_ADD) + MIN_ITEM_HEIGHT
  const colorIndex = Math.floor(Math.random() * COLORS.length)
  const color = COLORS[colorIndex] ?? '#4ECDC4'
  return {
    id,
    image: `https://picsum.photos/300/${height}?random=${id}`,
    title: `图片 ${id}`,
    height,
    color
  }
}

const distributeItems = () => {
  const newColumns: WaterfallItem[][] = Array.from({ length: columnCount.value }, () => [])
  const newHeights: number[] = Array.from({ length: columnCount.value }, () => 0)
  
  items.value.forEach(item => {
    const minHeightIndex = newHeights.indexOf(Math.min(...newHeights))
    if (newColumns[minHeightIndex] !== undefined) {
      newColumns[minHeightIndex].push(item)
    }
    if (newHeights[minHeightIndex] !== undefined) {
      newHeights[minHeightIndex] += item.height
    }
  })
  
  columns.value = newColumns
}

const loadMore = async () => {
  if (loading.value || items.value.length >= MAX_ITEMS) return
  loading.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, LOAD_DELAY))
    
    const startId = items.value.length
    const remainingItems = MAX_ITEMS - items.value.length
    const itemsToLoad = Math.min(ITEMS_PER_LOAD, remainingItems)
    
    if (itemsToLoad <= 0) return
    
    const newItems: WaterfallItem[] = []
    
    for (let i = 0; i < itemsToLoad; i++) {
      newItems.push(generateRandomItem(startId + i + 1))
    }
    
    items.value.push(...newItems)
    distributeItems()
  } catch (error) {
    console.error('Failed to load more items:', error)
  } finally {
    loading.value = false
  }
}

const handleScroll = debounce(() => {
  const scrollTop = window.scrollY
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  
  if (scrollTop + windowHeight >= documentHeight - SCROLL_THRESHOLD) {
    loadMore()
  }
}, 200)

const updateColumnCount = () => {
  const width = window.innerWidth
  if (width <= 480) {
    columnCount.value = 1
  } else if (width <= 768) {
    columnCount.value = 2
  } else {
    columnCount.value = COLUMN_COUNT
  }
  distributeItems()
}

onMounted(() => {
  updateColumnCount()
  loadMore()
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', debounce(updateColumnCount, 200))
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', updateColumnCount)
})
</script>

<template>
  <div class="waterfall-page">
    <h1 class="page-title">瀑布流展示</h1>
    <div class="waterfall-container">
      <div 
        v-for="(column, index) in columns" 
        :key="index" 
        class="waterfall-column"
      >
        <div 
          v-for="item in column" 
          :key="item.id" 
          class="waterfall-item"
          :style="{ backgroundColor: item.color }"
        >
          <img 
            :src="item.image" 
            :alt="item.title"
            class="item-image"
            loading="lazy"
          />
          <div class="item-content">
            <h3>{{ item.title }}</h3>
            <p>这是一段描述文字，展示瀑布流布局效果</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="loading" class="loading">
      <div class="loading-spinner"></div>
      <span>加载中...</span>
    </div>
  </div>
</template>

<style scoped>
.waterfall-page {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.page-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 30px;
  color: #333;
}

.waterfall-container {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.waterfall-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.waterfall-item {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.waterfall-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.item-image {
  width: 100%;
  display: block;
  object-fit: cover;
}

.item-content {
  padding: 15px;
  background: rgba(255, 255, 255, 0.95);
}

.item-content h3 {
  margin: 0 0 8px 0;
  font-size: 1rem;
  color: #333;
}

.item-content p {
  margin: 0;
  font-size: 0.875rem;
  color: #666;
  line-height: 1.5;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 30px;
  color: #666;
}

.loading-spinner {
  width: 24px;
  height: 24px;
  border: 3px solid #e0e0e0;
  border-top-color: #4ECDC4;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .waterfall-container {
    flex-wrap: wrap;
  }
  
  .waterfall-column {
    min-width: calc(50% - 8px);
    max-width: calc(50% - 8px);
  }
}

@media (max-width: 480px) {
  .waterfall-column {
    min-width: 100%;
    max-width: 100%;
  }
}
</style>

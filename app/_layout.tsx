import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { TasksProvider } from '@/contexts/TasksContext';

export default function RootLayout() {
  return (
    <TasksProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="category/[id]" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </TasksProvider>
  );
}

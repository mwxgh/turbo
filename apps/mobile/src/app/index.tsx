import { useQuery } from '@tanstack/react-query'
import { Link } from 'expo-router'
import { ScrollView, Text, View } from 'react-native'

import { Button } from '../components/button'
import { env } from '../lib/env'
import { healthQueryOptions } from '../lib/queries/health'

export default function Home() {
  const { data, error, isPending } = useQuery(healthQueryOptions())
  const status = isPending ? 'checking…' : error ? 'down' : data.status

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="gap-4 p-4"
    >
      <View className="gap-2 rounded-lg border border-border bg-card p-4">
        <Text className="text-lg font-semibold text-card-foreground">
          API health
        </Text>
        <Text className="text-muted-foreground">
          Status:{' '}
          <Text className={error ? 'text-destructive' : 'text-foreground'}>
            {status}
          </Text>
        </Text>
        {data && (
          <Text className="text-muted-foreground">
            {data.service} · {data.env} · up {Math.round(data.uptime)}s
          </Text>
        )}
        <Text className="text-xs text-muted-foreground">
          {env.appEnv} → {env.apiUrl}
        </Text>
      </View>
      <Link href="/hellos" asChild>
        <Button label="Open hellos" />
      </Link>
    </ScrollView>
  )
}

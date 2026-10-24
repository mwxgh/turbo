import { useState } from 'react'

import { useInfiniteQuery } from '@tanstack/react-query'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'

import type { Hello } from '@repo/types'
import { formatDateTime } from '@repo/utils'

import { Button } from '../components/button'
import { HelloForm } from '../components/hello-form'
import { hellosInfiniteQueryOptions } from '../lib/queries/hellos'
import { useHelloMutations } from '../lib/use-hello-mutations'

export default function HellosScreen() {
  const {
    data,
    error,
    isPending,
    refetch,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(hellosInfiniteQueryOptions())
  const { create, update, remove } = useHelloMutations()
  const [editingId, setEditingId] = useState<string>()

  const renderItem = ({ item }: { item: Hello }) =>
    item.id === editingId ? (
      <View className="border-b border-border p-4">
        <HelloForm
          defaultMessage={item.message}
          submitLabel="Save"
          autoFocus
          onSubmit={(input) => update.mutateAsync({ id: item.id, ...input })}
          onSuccess={() => setEditingId(undefined)}
          onCancel={() => setEditingId(undefined)}
        />
      </View>
    ) : (
      <View className="flex-row items-center gap-2 border-b border-border p-4">
        <View className="flex-1 gap-1">
          <Text className="text-foreground">{item.message}</Text>
          <Text className="text-xs text-muted-foreground">
            {formatDateTime(item.createdAt)}
          </Text>
        </View>
        <Button
          label="Edit"
          variant="ghost"
          onPress={() => setEditingId(item.id)}
        />
        <Button
          label="Delete"
          variant="destructive"
          disabled={remove.isPending && remove.variables === item.id}
          onPress={() => remove.mutate(item.id)}
        />
      </View>
    )

  return (
    <View className="flex-1 bg-background">
      <View className="border-b border-border p-4">
        <HelloForm
          submitLabel="Add hello"
          placeholder="Say hello…"
          onSubmit={(input) => create.mutateAsync(input)}
        />
      </View>
      {isPending ? (
        <ActivityIndicator className="mt-8" />
      ) : error ? (
        <Text className="p-4 text-destructive">{error.message}</Text>
      ) : (
        <FlatList
          data={data.pages.flatMap((page) => page.items)}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          refreshing={isRefetching}
          onRefresh={() => void refetch()}
          onEndReached={() =>
            hasNextPage && !isFetchingNextPage && void fetchNextPage()
          }
          ListEmptyComponent={
            <Text className="p-4 text-muted-foreground">No hellos yet.</Text>
          }
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator className="my-4" />
            ) : undefined
          }
        />
      )}
    </View>
  )
}

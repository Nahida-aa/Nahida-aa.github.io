import heapq
from collections import defaultdict

def dijkstra(graph, start):
    dist = {node: float('inf') for node in graph}
    dist[start] = 0
    pq = [(0, start)]  # (distance, node)
    
    while pq:
        current_dist, current_node = heapq.heappop(pq)
        
        if current_dist > dist[current_node]:
            continue
        
        for neighbor, weight in graph[current_node]:
            distance = current_dist + weight
            if distance < dist[neighbor]:
                dist[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
    
    return dist

# 示例图：邻接表表示
graph = defaultdict(list)
graph['A'].append(('B', 1))
graph['A'].append(('C', 4))
graph['B'].append(('C', 2))
graph['B'].append(('D', 6))
graph['C'].append(('D', 3))

print(dijkstra(graph, 'A'))
import redis
from rq import Worker, Queue
# from app.config import Config

# Configure Redis connection
conn = redis.from_url('redis://:password@20.198.10.102:6379/0')

if __name__ == '__main__':
    # Define the queue
    q = Queue(connection=conn)
    
    # Start the worker
    worker = Worker([q], connection=conn)
    print(f"Worker started, listening for jobs on queue '{q.name}'")
    worker.work()
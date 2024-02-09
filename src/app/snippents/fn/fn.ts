function queueTime(customers: number[], n: number) {
    if (!customers.length) {
        return 0;
    }

    if (n < 2) {
        return customers.reduce((acc, item) => acc + item, 0);
    }

    if (n >= customers.length) {
        return Math.max(...customers);
    }

    const queues = Array.from({ length: n }, () => []);

    for (let index = 0; index < customers.length; index++) {
        if (index < n) {
            queues[index].push(customers[index]);
            continue;
        }

        const queuesTime = queues.map((arr) =>
            arr.reduce((acc, item) => acc + item, 0)
        );
        const minQueue = queuesTime.indexOf(Math.min(...queuesTime));

        queues[minQueue].push(customers[index]);
    }

    return Math.max(...queues.map(el => el.reduce((acc, item) => acc + item, 0)));
}

console.log(queueTime([10,2,3,3], 2));

    // queueTime([], 1), 0);
    // queueTime([1,2,3,4], 1), 10)
    // queueTime([2,2,3,3,4,4], 2), 9)
    // queueTime([1,2,3,4,5], 100), 5)
    // queueTime([5,3,4],    1), 12);
    // queueTime([10,2,3,3], 2), 10);
    // queueTime([2,3,10,2], 2), 12);
function Skeleton({ href }: { href: string }) {
    return (
        <img
            src={`/barbermans/${href}`}
            alt="skeleton"
            className="h-40 w-full rounded-md object-cover"
        />
    );
}

export default Skeleton;

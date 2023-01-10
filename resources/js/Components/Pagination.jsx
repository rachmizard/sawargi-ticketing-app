import { Link } from "@inertiajs/inertia-react";

import Button from "./Button";

export default function Pagination({ links = [] }) {
    return (
        <div className="flex gap-4">
            {links.map((link, key) => (
                <Link
                    key={key}
                    preserveScroll
                    preserveState
                    disabled={!link.url}
                    href={link.url}
                >
                    <Button
                        disabled={link.active || !link.url}
                        variant="outline"
                        colorScheme="gray"
                        size="xs"
                    >
                        <span
                            dangerouslySetInnerHTML={{
                                __html: link.label,
                            }}
                        />
                    </Button>
                </Link>
            ))}
        </div>
    );
}

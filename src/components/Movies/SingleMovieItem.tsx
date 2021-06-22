import React from 'react'

interface SingleMovieItemProps {
    items: any
}

export const SingleMovieItem = ({ items }: SingleMovieItemProps) => {
    console.log(items)
    return (
        <div>
            Movie
        </div>
    )
};
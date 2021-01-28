const A = function () {
    const CANVAS_CONTAINER_PADDING = 5
    const TICK_COLOR = "#000"

    const _element = document.querySelector(".time-bar")
    const _canvas = _element.querySelector("canvas")
    const _tracksContainer = {
        container: document.querySelector('.tracks-container'),
        element: document.querySelector('.tracks-container-wrapper'),
    }

    const duration = 60

    function drawTicks() {
        const tracksContainerWidth = _tracksContainer.container.getBoundingClientRect().width
        const width = Math.min(tracksContainerWidth, _tracksContainer.container.scrollWidth)
        const containerWidth = Math.min(width, _tracksContainer.element.offsetWidth - CANVAS_CONTAINER_PADDING)

        const context = _canvas.getContext("2d")

        if (_canvas.height !== _canvas.offsetHeight) {
            _canvas.height = _canvas.offsetHeight
        }

        if (_canvas.width !== containerWidth) {
            _canvas.width = containerWidth
        }

        const inc = _tracksContainer.container.clientWidth / duration
        let lastPosition = 0
        const start = _tracksContainer.element.scrollLeft / inc
        const end = (_tracksContainer.element.scrollLeft + containerWidth) / inc

        context.clearRect(0, 0, _canvas.width, _canvas.height)
        context.translate(-_tracksContainer.element.scrollLeft, 0)
        context.beginPath()

        for (let i = 1, l = duration + 1; i < l; i++) {
            // If the current time is not in the viewport, just skip it
            if (i + 1 < start) {
                continue
            }

            if (i - 1 > end) {
                break
            }

            const position = i * inc
            const spaceBetween = -~(position) + ~(lastPosition)

            // ensure there is enough space to draw a seconds tick
            if (spaceBetween > 3) {
                // ensure there is enough space to draw a half second tick
                if (spaceBetween > 6) {
                    context.moveTo(-~position - spaceBetween / 2, 0)
                    context.lineTo(-~position - spaceBetween / 2, 7)

                    // ensure there is enough space for quarter ticks
                    if (spaceBetween > 12) {
                        context.moveTo(-~position - spaceBetween / 4 * 3, 0)
                        context.lineTo(-~position - spaceBetween / 4 * 3, 4)

                        context.moveTo(-~position - spaceBetween / 4, 0)
                        context.lineTo(-~position - spaceBetween / 4, 4)
                    }
                }

                context.moveTo(-~position, 0)
                context.lineTo(-~position, 10)

                lastPosition = position
            }
        }

        context.strokeStyle = TICK_COLOR
        context.stroke()
        context.translate(_tracksContainer.element.scrollLeft, 0)
    }

    this.update = function () {
        drawTicks()
    }
}

var l = new A()
l.update()
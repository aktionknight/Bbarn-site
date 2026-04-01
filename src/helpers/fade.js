
            const sceneWrapper = document.getElementById('scene-wrapper');
            const stool = document.getElementById('stool-wrapper');
            const introCanvas = document.getElementById('intro-canvas-wrapper');
            const introHeight = window.innerHeight * 4; // Matches the h-[400vh]
            const overlay = document.getElementById('text-overlay');
            window.addEventListener('scroll', () => {
                const scrollY = window.scrollY;

                // TRIGGER POINT: When we are near the end of the intro section (e.g. 90%)
                if (scrollY > introHeight * 0.9) {
                    // Fade IN the 3D Scene
                   if (sceneWrapper) {
                sceneWrapper.classList.remove('opacity-0');
                sceneWrapper.classList.add('opacity-100');
            }
            
            // 2. Fade In Stool (NEW LOGIC)
            if (stool) {
                stool.classList.remove('opacity-0');
                stool.classList.add('opacity-100');
            }

            // 3. Fade In Text Overlay
            if (overlay) {
                overlay.classList.remove('opacity-0');
                overlay.classList.add('opacity-100');
            }

            // 4. Hide Intro Video
            if (introCanvas) {
                introCanvas.classList.add('opacity-0');
            }

        } else {
            // REVERT (Fade everything out if scrolling back up)
            if (sceneWrapper) {
                sceneWrapper.classList.add('opacity-0');
                sceneWrapper.classList.remove('opacity-100');
            }

            if (stool) { // <--- NEW
                stool.classList.add('opacity-0');
                stool.classList.remove('opacity-100');
            }

            if (overlay) {
                overlay.classList.add('opacity-0');
                overlay.classList.remove('opacity-100');
            }
            
            if (introCanvas) {
                introCanvas.classList.remove('opacity-0');
            }
        }
            });
        
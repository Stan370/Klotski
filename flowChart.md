graph TD
    A[Constructor] -->|1| B[Initialize Game State]
    B --> B1[Set Language]
    B --> B2[Initialize BLOCKS]
    B --> B3[Load Level Layout]
    
    A -->|2| C[initializeGame]
    C --> C1[Create Board]
    C --> C2[Render Pieces]
    C --> C3[Update Stats]
    C --> C4[Update UI Text]
    C --> C5[Setup Event Listeners]

    D[User Interactions] --> D1[Level Selection]
    D --> D2[Language Selection]
    D --> D3[Piece Click]
    D --> D4[Reset Game]
    D --> D5[Undo Move]

    D3 --> E[handlePieceClick]
    E --> F[Get Possible Moves]
    F --> G{Multiple Moves?}
    G -->|Yes| H[Show Move Options]
    G -->|No| I[Move Piece]
    H --> I
    
    I --> J[moveToPosition]
    J --> J1[Save History]
    J --> J2[Update Position]
    J --> J3[Update Stats]
    J --> J4[Render Pieces]
    J --> J5[Check Win]

    J5 -->|Win| K[Handle Win]
    K --> K1[Prompt UserID]
    K1 --> K2[Save Best Score]
    K2 --> K3[Reset Game]

    D4 --> L[resetGame]
    L --> L1[Clear Arrows]
    L --> L2[Reset State]
    L --> L3[Reset Stats]
    L --> L4[Render Pieces]

    D5 --> M[undoMove]
    M --> M1[Pop History]
    M1 --> M2[Update State]
    M2 --> M3[Update Stats]
    M3 --> M4[Render Pieces]

    subgraph Game Loop
        E
        F
        G
        H
        I
        J
    end

    subgraph Rendering
        C2
        J4
        L4
        M4
    end

    subgraph State Management
        J1
        J2
        L2
        M2
    end
import { useState, useEffect } from 'react';

interface CodingChallenge {
  id: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  template: string;
  expectedOutput: string;
  hints?: string[];
}

const codingChallenges: CodingChallenge[] = [
  {
    id: 1,
    title: 'Simple Button with Hover Effect',
    description: 'Create a button that changes color when you hover over it.',
    difficulty: 'Easy',
    template: `<style>
  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    background-color: ___;
    transition: ___;
  }
  
  button:___ {
    background-color: green;
  }
</style>

<button>Hover Me</button>`,
    expectedOutput: `<style>
  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    background-color: blue;
    transition: 0.3s;
  }
  
  button:hover {
    background-color: green;
  }
</style>

<button>Hover Me</button>`,
    hints: []
  },
];

const Coding = () => {
  const [userCode, setUserCode] = useState(codingChallenges[0].template);
  const [userOutput, setUserOutput] = useState<string>('');
  const [matchPercentage, setMatchPercentage] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [matchStatus, setMatchStatus] = useState<'perfect' | 'partial' | 'error' | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    setUserCode(codingChallenges[0].template);
    setUserOutput('');
    setMatchPercentage(0);
    setShowResult(false);
    setMatchStatus(null);
    setTimeElapsed(0);
  }, []);

  // Timer effect - show percentage after 2 minutes
  useEffect(() => {
    if (showResult && matchStatus === 'partial') {
      const timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);

      if (timeElapsed >= 120) {
        // After 2 minutes, ensure percentage is showing
      }

      return () => clearInterval(timer);
    }
  }, [showResult, matchStatus, timeElapsed]);

  const calculateMatch = (code1: string, code2: string): number => {
    const normalize = (str: string) => 
      str.toLowerCase()
        .replace(/___/g, '') // Remove all ___ placeholders
        .replace(/\s+/g, ' ')
        .trim();
    
    const norm1 = normalize(code1);
    const norm2 = normalize(code2);

    if (norm1 === norm2) return 100;

    let matches = 0;
    let total = Math.max(norm1.length, norm2.length);

    for (let i = 0; i < Math.min(norm1.length, norm2.length); i++) {
      if (norm1[i] === norm2[i]) matches++;
    }

    return Math.round((matches / total) * 100);
  };

  const checkOutput = () => {
    try {
      // Render the user's HTML/CSS code
      setUserOutput(userCode);
      const percentage = calculateMatch(userCode, codingChallenges[0].expectedOutput);
      setMatchPercentage(percentage);
      setTimeElapsed(0);

      if (percentage === 100) {
        setMatchStatus('perfect');
      } else if (percentage >= 70) {
        setMatchStatus('partial');
      } else {
        setMatchStatus('error');
      }

      setShowResult(true);
    } catch (err) {
      setMatchStatus('error');
      setShowResult(true);
    }
  };

  const handleClearCode = () => {
    setUserCode(codingChallenges[0].template);
    setUserOutput('');
    setMatchPercentage(0);
    setShowResult(false);
    setMatchStatus(null);
    setTimeElapsed(0);
  };

  const getStatusColor = () => {
    switch (matchStatus) {
      case 'perfect':
        return 'bg-green-500/20 border-green-500';
      case 'partial':
        return 'bg-yellow-500/20 border-yellow-500';
      case 'error':
        return 'bg-red-500/20 border-red-500';
      default:
        return '';
    }
  };

  const getStatusText = () => {
    switch (matchStatus) {
      case 'perfect':
        return '✓ Perfect Match!';
      case 'partial':
        return '⚠ Partially Correct';
      case 'error':
        return '✗ Incorrect';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6">
      <div className="bg-[#1a2332] border border-white/10 w-full max-w-5xl p-8 rounded-2xl shadow-xl">
        {/* Title */}
        <h2 className="text-3xl font-bold gradient-text mb-2 text-center">
          {codingChallenges[0].title}
        </h2>
        <p className="text-gray-300 text-center mb-8">{codingChallenges[0].description}</p>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Code Editor */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Your Code</h3>
            <textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              className="w-full h-80 bg-[#0f1729] text-gray-100 p-4 rounded-lg border border-white/20 font-mono text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 resize-none"
              placeholder="Write your code here..."
            />
            
            <div className="flex gap-4">
              <button
                onClick={checkOutput}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold rounded-lg transition-all transform hover:scale-105"
              >
                Check Output
              </button>
              <button
                onClick={handleClearCode}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition-all"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Right - Output Preview */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Your Output</h3>
            <div className="bg-white rounded-lg p-4 h-40 overflow-auto border border-white/20 mb-4">
              {userOutput ? (
                <iframe
                  srcDoc={userOutput}
                  className="w-full h-full border-0"
                  title="Your Output"
                  sandbox="allow-scripts"
                />
              ) : (
                <p className="text-gray-400 text-center py-12">Click "Check Output" to see your result</p>
              )}
            </div>

            <h3 className="text-lg font-bold text-white">Expected Output</h3>
            <div className="bg-white rounded-lg p-4 h-40 overflow-auto border border-white/20">
              <iframe
                srcDoc={codingChallenges[0].expectedOutput}
                className="w-full h-full border-0"
                title="Expected Output"
                sandbox="allow-scripts"
              />
            </div>
          </div>
        </div>

        {/* Results Section */}
        {showResult && (
          <div className={`mt-8 border-2 rounded-lg p-6 ${getStatusColor()}`}>
            <h3 className="text-xl font-bold text-white mb-4">{getStatusText()}</h3>
            
            {matchStatus === 'perfect' && (
              <div className="text-green-300 font-semibold text-center">
                <p className="text-4xl mb-2">✓ 100%</p>
                <p className="text-lg">Congratulations! Your code matches perfectly!</p>
              </div>
            )}

            {matchStatus === 'partial' && (
              <div className="text-yellow-300">
                <p className="font-semibold mb-3">Match Progress:</p>
                <div className="w-full bg-yellow-500/20 rounded-full h-4 mb-4">
                  <div
                    className="bg-yellow-500 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${matchPercentage}%` }}
                  />
                </div>
                <p className="text-center font-bold text-2xl">{matchPercentage}%</p>
                {timeElapsed >= 120 && (
                  <p className="text-sm mt-3 text-yellow-200 text-center">
                    Keep trying! You're close to the solution.
                  </p>
                )}
              </div>
            )}

            {matchStatus === 'error' && (
              <div className="text-red-300">
                <p className="font-semibold mb-3">Your Match:</p>
                <div className="w-full bg-red-500/20 rounded-full h-4 mb-4">
                  <div
                    className="bg-red-500 h-4 rounded-full"
                    style={{ width: `${Math.max(matchPercentage, 10)}%` }}
                  />
                </div>
                <p className="text-center font-bold text-2xl">{matchPercentage}%</p>
                <p className="text-sm mt-3 text-center">Compare your code with the expected output above.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Coding;
